'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { trackScrollDepth, trackOutboundLink } from '@lib/analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MEASUREMENT_ID';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'CLARITY_PROJECT_ID';

export function Analytics() {
  // Privacy-friendly Scroll Depth & Outbound Link Listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Scroll Depth Landmarks (25%, 50%, 75%, 100%)
    const trackedDepths = new Set<number>();
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = window.scrollY;
      const scrollPercent = Math.round((currentScroll / scrollHeight) * 100);

      [25, 50, 75, 100].forEach((depth) => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          trackScrollDepth(depth);
        }
      });
    };

    // Track Outbound Link Clicks Automatically
    const handleOutboundClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
        trackOutboundLink(href);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleOutboundClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutboundClick);
    };
  }, []);

  const hasGA = GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-MEASUREMENT_ID';
  const hasClarity = CLARITY_ID && CLARITY_ID !== 'CLARITY_PROJECT_ID';

  return (
    <>
      {/* 1. Google Analytics 4 Script (Privacy-Friendly IP Anonymization) */}
      {hasGA && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  allow_google_signals: false
                });
              `,
            }}
          />
        </>
      )}

      {/* 2. Microsoft Clarity Script */}
      {hasClarity && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}
    </>
  );
}

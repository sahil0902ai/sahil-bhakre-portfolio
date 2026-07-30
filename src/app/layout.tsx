import type { Metadata } from 'next';
import { Outfit, Geist, Geist_Mono } from 'next/font/google';
import { seoConfig } from '@config/site';
import { PortfolioProvider } from '@context/PortfolioContext';
import { CursorGlow } from '@components/shared/CursorGlow';
import { PremiumBackground } from '@components/shared/PremiumBackground';
import { CommandPalette } from '@components/shared/CommandPalette';
import { AIAssistant } from '@components/shared/AIAssistant';
import { JsonLdSchema } from '@components/shared/JsonLdSchema';
import { Analytics } from '@components/shared/Analytics';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: seoConfig.title,
    template: '%s | Sahil Bhakre',
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author, url: seoConfig.domain }],
  creator: seoConfig.author,
  metadataBase: new URL(seoConfig.domain),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: seoConfig.domain,
    title: seoConfig.title,
    description: seoConfig.description,
    siteName: seoConfig.author,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    creator: seoConfig.twitterCreator,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <JsonLdSchema />
      </head>
      <body className="antialiased relative min-h-screen">
        <PortfolioProvider>
          <Analytics />
          <PremiumBackground />
          <CursorGlow />
          <CommandPalette />
          <AIAssistant />
          <div className="relative z-10">
            {children}
          </div>
        </PortfolioProvider>
      </body>
    </html>
  );
}

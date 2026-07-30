'use client';

// Production Analytics Event Types
export type AnalyticsEvent = 
  | 'project_click'
  | 'cta_click'
  | 'contact_form_submit'
  | 'resume_download'
  | 'scroll_depth'
  | 'outbound_link_click'
  | 'command_palette_open';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

// Check if user has enabled Do Not Track (Privacy-friendly)
function isDoNotTrackEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    navigator.doNotTrack === '1' ||
    (window as any).doNotTrack === '1' ||
    (navigator as any).globalPrivacyControl === true
  );
}

// Core Event Dispatcher
export function trackEvent(eventName: AnalyticsEvent, properties?: EventProperties) {
  if (typeof window === 'undefined' || isDoNotTrackEnabled()) {
    return;
  }

  // 1. Google Analytics 4 Dispatch
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, properties);
  }

  // 2. Microsoft Clarity Dispatch
  if (typeof (window as any).clarity === 'function') {
    (window as any).clarity('event', eventName);
  }

  // 3. Console Telemetry in Development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Track] ${eventName}:`, properties);
  }
}

// Helper Tracking Functions
export function trackProjectClick(projectId: string, projectTitle: string) {
  trackEvent('project_click', { projectId, projectTitle });
}

export function trackCTAClick(ctaName: string, destination: string) {
  trackEvent('cta_click', { ctaName, destination });
}

export function trackFormSubmit(formName: string, projectType?: string) {
  trackEvent('contact_form_submit', { formName, projectType });
}

export function trackResumeDownload(format: 'pdf' | 'print') {
  trackEvent('resume_download', { format });
}

export function trackScrollDepth(depthPercent: number) {
  trackEvent('scroll_depth', { depthPercent });
}

export function trackOutboundLink(url: string) {
  trackEvent('outbound_link_click', { url });
}

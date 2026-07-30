'use client';

import { createContext, useContext, ReactNode } from 'react';
import {
  personalInfo,
  servicesData,
  projectsData,
  technologyData,
  timelineData,
  testimonialsData,
  faqData,
  contactConfig,
} from '@config/portfolio';

interface PortfolioContextType {
  personalInfo: typeof personalInfo;
  servicesData: typeof servicesData;
  projectsData: typeof projectsData;
  technologyData: typeof technologyData;
  timelineData: typeof timelineData;
  testimonialsData: typeof testimonialsData;
  faqData: typeof faqData;
  contactConfig: typeof contactConfig;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        servicesData,
        projectsData,
        technologyData,
        timelineData,
        testimonialsData,
        faqData,
        contactConfig,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

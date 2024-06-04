"use client"
import React from 'react';
import Navigation from "./navigation";
import HomePageContent from "./home/page";
import AboutPageContent from "./about/page";
import ContactPageContent from "./contact/page";
import PartnershipPageContent from "./partnerships/page";
import ServicesPageContent from "./services/page";
import { usePathname } from 'next/navigation';
import Footer from './footer';

const Page = () => {
  const pathname = usePathname();

  const contentComponents: { [key: string]: React.ReactNode } = {
    '/': <HomePageContent />,
    '/about': <AboutPageContent />,
    '/contact': <ContactPageContent />,
    '/partnerships': <PartnershipPageContent />,
    '/services': <ServicesPageContent />,
  };

  return (
    <>
      <Navigation />
      <main className='py-20'>
        {contentComponents[pathname] || <div>Page Not Found</div>}
      </main> 
    </>
  );
};

export default Page;

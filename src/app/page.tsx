"use client"
import React from 'react';
import Logo from '@public/img/logo-v2.png';
import Image from 'next/image';
import Navigation from "./navigation";
import HomePageContent from "./pages/home/page";
import AboutPageContent from "./pages/about/page";
import ContactPageContent from "./pages/contact/page";
import PartnershipPageContent from "./pages/partnership/page";
// import ServicesPageContent from "./pages/service/page";
import { usePathname } from 'next/navigation';

const Page = () => {
  const pathname = usePathname();

  const contentComponents: { [key: string]: React.ReactNode } = {
    '/': <HomePageContent />,
    '/about': <AboutPageContent />,
    '/contact': <ContactPageContent />,
    '/partnerships': <PartnershipPageContent />,
    // '/services': <ServicesPageContent />,
  };

  return (
    <>
      <Navigation />
      <main className='py-20'>
        {contentComponents[pathname] || <div>Page Not Found</div>}
      </main>
      <footer className='py-4 text-center'>
        <div className='flex items-center justify-center'>
          <span className='mr-3'>
            <Image
              src={Logo}
              alt='Logo'
              quality={100}
              width={200}
              height={200}
            />
          </span>
          <span className='text-sm font-medium text-[#6B7280]'>
            © {new Date().getFullYear()} VC Lab
          </span>
        </div>
      </footer>
    </>
  );
};

export default Page;

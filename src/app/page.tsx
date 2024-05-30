
import React from 'react';
import Logo from '@public/img/logo-v2.png';
import Image from 'next/image';
import Navigation from "./navigation";
import HomePageContent from "./pages/HomePageContent";

const page = () => {
  return (
    <>
      <Navigation />
      <main className='py-20'>
        <HomePageContent />
      </main>
      <footer className='py-4 text-center'>
        <div className='flex items-center justify-center'>
          <span className='mr-3'>
            <Image src={Logo} alt='Logo' width={32} height={32} />
          </span>
          <span className='text-sm font-medium text-[#6B7280]'>
            © {new Date().getFullYear()} VC Lab
          </span>
        </div>
      </footer>
    </>
  );
};

export default page;

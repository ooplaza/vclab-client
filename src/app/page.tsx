import React from 'react';
import Logo from '@public/img/logo-v2.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AppContactForm from '@/components/AppContactForm';

const page = () => {
  return (
    <>
      <header className='fixed top-0 w-full bg-white py-4 shadow-lg'>
        <div className='container'>
          <div className='after:clear-both after:block'>
            <div className='float-left'>
              <Link className='flex items-center justify-center' href='/'>
                <span className='mr-4'>
                  <Image
                    src={Logo}
                    alt='Logo'
                    quality={100}
                    width={200}
                    height={200}
                  />
                </span>
                {/* <span className='text-2xl font-bold'>VC Lab</span> */}
              </Link>
            </div>
            <div className='float-right flex items-center'>
              <nav className='mr-6'>
                <ul className='flex space-x-4'>
                  <li>
                    <Link href='/'>Home</Link>
                  </li>
                  <li>
                    <Link href='/about'>About</Link>
                  </li>
                  <li>
                    <Link href='/services'>Services</Link>
                  </li>
                  <li>
                    <Link href='/partnerships'>Partnerships & Linkages</Link>
                  </li>
                  <li>
                    <Link href='/contact'>Contact</Link>
                  </li>
                </ul>
              </nav>
              <Button variant='default' className='rounded-lg text-white' asChild>
                <Link href='/login'>Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className='py-20'>
        <section className='banner container h-screen pt-24 text-center'>
          <h1 className='leading-40 pb-7 text-4xl font-bold'>
            UP Mindanao Agri-Aqua Value Chain Laboratory
          </h1>
          <p className='text-md mb-10 font-medium leading-[26px]'>
            Welcome to the UP Mindanao Agri-Aqua Value Chain Laboratory, your dedicated companion throughout the incredible journey of advancing agriculture and aquaculture value chains. We are here to ensure every step of the way is filled with confidence and care.
          </p>
          <Button asChild className='text-white'>
            <Link href='/login'>Get Started</Link>
          </Button>
        </section>
        <section className='contact-us container'>
          <h3 className='mb-5 text-center text-3xl font-bold'>Contact Us</h3>
          <p className='mb-16 text-center leading-7'>
            Reach out to us with any questions, feedback, or inquiries you may
            have. We{"'"}re here to assist you and provide the support you need.
            Feel free to get in touch, and our team will be happy to assist you
            promptly.
          </p>
          <AppContactForm />
        </section>
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

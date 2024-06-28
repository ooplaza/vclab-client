'use client';
import React from 'react';
import Image from 'next/image';
import LOGO from '/public/img/partnership.png';
import CustomButtonTarget from '@/components/CustomButtonTarget';
import { Microscope } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Navigation from '../navigation';
import Footer from '../footer';
import Link from 'next/link';

export default function page() {
  return (
    <>
      <Navigation />
      <section className='max-w-contentContainer lgl:mt-20 sml:mt-10 mdl:py-24 lgl:gap-8 mdl:px-10 mx-auto flex flex-col gap-4 py-24 sm:mt-10 xl:px-4'>
        <div className='container'>
          <div className='text-bodyColor mb-10 text-center'>
            <SectionTitle
              title='PARTNERSHIPS & LINKAGES'
              fontSize={
                'text-4xl lgl:text-5xl md:text-4xl sm:text-3xl xs:text-2xl tracking-wider mt-20 md:mt-0'
              }
            />
          </div>
          <div className='xs:flex-col sml:flex-col mdl:flex-row lgl:flex-row flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row'>
            {/* Reorder for small devices */}
            <div className='xs:order-1 sml:order-1 mdl:order-2 lgl:order-2 order-2 mx-auto mt-20 rounded-lg sm:order-1 md:order-1 lg:order-2 xl:order-2'>
              <div className='h-60 w-96 object-contain'>
                <Image
                  priority={true}
                  quality={100}
                  src={LOGO}
                  alt='Logo'
                  layout='responsive'
                  className='h-auto w-full'
                />
              </div>
            </div>
            <div className='xs:order-2 sml:order-2 mdl:order-1 lgl:order-1 order-1 mt-20 rounded-lg px-10 py-10 sm:order-2 md:order-2 lg:order-1 xl:order-1'>
              <SectionTitle title={'PROJECT SARAI'} fontSize={'text-lg'} />
              <div className='text-start'>
                <p className='mt-10'>
                  Project SARAI (Smarter Approaches to Reinvigorate Agriculture
                  as an Industry in the Philippines) is an action-research
                  program, funded by the Department of Science and Technology –
                  Philippine Council for Agriculture, Aquatic and Natural
                  Resources Research and Development (DOST-PCAARRD), working
                  towards reducing climate risks by providing agricultural
                  stakeholders with site-specific crop advisories.
                </p>
                <p className='mt-10'>
                  It anchors on sustainability through multi-level partnerships
                  starting from farming communities up to national agencies. In
                  2021, the ultimate goal is to have established regional and
                  community-level SARAI hubs where farmers can easily go to for
                  up-to-date information, and to report initial farm conditions.
                </p>
                <div className='mt-10'>
                  <Link href='https://sarai.ph/' target='_blank' passHref>
                    <button className='hover:bg-primary-dark rounded-md bg-primary px-4 py-2 text-white transition duration-300'>
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

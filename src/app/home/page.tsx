"use client"
import React from 'react';
import Link from 'next/link';
import { Info, Settings } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CustomButton from '@/components/CustomButton';
import Navigation from '../navigation';
import Footer from '../footer';

export default function page() {
  return (
    <>
      <Navigation />
      <section className="max-w-contentContainer py-24 mx-auto mdl:py-24 flex flex-col gap-4 lgl:gap-8 mdl:px-10 xl:px-4">
        <div className="container">
          <div className="flex flex-col gap-4 mx-4">
            <div className="text-center text-bodyColor">
              <SectionTitle
                fontSize={
                  'text-5xl lgl:text-6xl md:text-4xl sm:text-3xl xs:text-2xl'
                }
                title="UP Mindanao Agri-Aqua Value Chain Laboratory"
              />
            </div>
            <div className="flex justify-center items-center flex-col xs:flex-col sm:flex-col sml:flex-row md:flex-row mdl:flex-row lg:flex-row lgl:flex-row xl:flex-row gap-4 py-8">
              <div className="group inline-block">
                <a
                  href="/services"
                  className="bg-white border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md transition duration-300 flex items-center"
                >
                  <Settings className="h-6 w-6 mr-2 text-primary hover:text-white transition" />
                  <span className="text-sm font-semibold">Services</span>
                </a>
              </div>
              <div className="group inline-block">
                <a
                  href="/about"
                  className="bg-white border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md transition duration-300 flex items-center"
                >
                  <Info className="h-5 w-5 mr-2 text-primary hover:text-white transition" />
                  <span className="text-sm font-semibold">About Us</span>
                </a>
              </div>
            </div>
            <div className="text-center mt-20">
              <SectionTitle fontSize={'text-3xl'} title={'Modules Developed'} />
              <div className="flex gap-4 justify-center my-10 flex-col xs:flex-col sm:flex-col sml:flex-col md:flex-col mdl:flex-col lg:flex-row lgl:flex-row xl:flex-row">
                <div className="flex-1 rounded-xl font-semibold py-20 px-40 border shadow-md calculator-image">
                  <Link
                    className="text-white text-lg font-bold flex items-center justify-center h-full"
                    href="https://dev-upminaavclab.pantheonsite.io/"
                    target="_blank"
                  >
                    Production Cost Calculator
                  </Link>
                </div>
                <div className="flex-1 rounded-xl font-semibold py-20 px-40 border shadow-md market-image">
                  <Link
                    className="text-white text-lg font-bold flex items-center justify-center h-full"
                    href="https://dev-upminaavclab.pantheonsite.io/"
                    target="_blank"
                  >
                    Market Optimizer
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

import React from 'react';
import Link from 'next/link';
import { Info, Settings } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CustomButton from '@/components/CustomButton';

export default function HomePageContent() {
  return (
    <>
      <div className="flex flex-col gap-4 mx-4 mt-20">
        <div className="text-center text-bodyColor">
          <SectionTitle
            fontSize={
              'text-5xl lgl:text-6xl md:text-4xl sm:text-3xl xs:text-2xl'
            }
            title="UP Mindanao Agri-Aqua Value Chain Laboratory"
          />
        </div>
        <div className="flex justify-center items-center flex-col xs:flex-col sm:flex-col sml:flex-row md:flex-row mdl:flex-row lg:flex-row lgl:flex-row xl:flex-row gap-4 py-8">
          <div>
            <CustomButton
              hoverClass={
                'font-semibold hover:bg-green-300 hover:text-bodyColor'
              }
              title={'Services'}
              link={'/services'}
              icon={<Settings className="h-6 w-6" />}
            />
          </div>
          <div>
            <CustomButton
              hoverClass={
                'font-semibold hover:bg-green-300 hover:text-bodyColor'
              }
              title={'About Us'}
              link={'/about'}
              icon={<Info className="h-5 w-5" />}
            />
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
    </>
  );
}

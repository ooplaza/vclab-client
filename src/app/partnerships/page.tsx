"use client";
import React from "react";
import Image from "next/image";
import LOGO from "/public/img/partnership.png";
import CustomButtonTarget from "@/components/CustomButtonTarget";
import { Microscope } from "lucide-react"
import SectionTitle from "@/components/SectionTitle";
import Navigation from "../navigation";
import Footer from "../footer";
import Link from 'next/link';

export default function page() {
  return (
    <>
      <Navigation />
      <section className="max-w-contentContainer py-24 mx-auto lgl:mt-20 sml:mt-10 sm:mt-10 mdl:py-24 flex flex-col gap-4 lgl:gap-8 mdl:px-10 xl:px-4">
        <div className="container">
          <div className="text-center text-bodyColor mb-10">
            <SectionTitle
              title="PARTNERSHIPS & LINKAGES"
              fontSize={
                "text-4xl lgl:text-5xl md:text-4xl sm:text-3xl xs:text-2xl tracking-wider mt-20 md:mt-0"
              }
            />
          </div>
          <div className="flex flex-col xs:flex-col sm:flex-col sml:flex-col md:flex-col mdl:flex-row lg:flex-row lgl:flex-row xl:flex-row">
            {/* Reorder for small devices */}
            <div className="rounded-lg mt-20 mx-auto order-2 xs:order-1 sm:order-1 sml:order-1 md:order-1 mdl:order-2 lg:order-2 lgl:order-2 xl:order-2">
              <div className="object-contain h-60 w-96">
                <Image
                  priority={true}
                  quality={100}
                  src={LOGO}
                  alt="Logo"
                  layout="responsive"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="rounded-lg mt-20 py-10 px-10 order-1 xs:order-2 sm:order-2 sml:order-2 md:order-2 mdl:order-1 lg:order-1 lgl:order-1 xl:order-1">
              <SectionTitle title={"PROJECT SARAI"} fontSize={"text-lg"} />
              <div className="text-start">
                <p className="mt-10">
                  Project SARAI (Smarter Approaches to Reinvigorate Agriculture
                  as an Industry in the Philippines) is an action-research
                  program, funded by the Department of Science and Technology –
                  Philippine Council for Agriculture, Aquatic and Natural
                  Resources Research and Development (DOST-PCAARRD), working
                  towards reducing climate risks by providing agricultural
                  stakeholders with site-specific crop advisories.
                </p>
                <p className="mt-10">
                  It anchors on sustainability through multi-level partnerships
                  starting from farming communities up to national agencies. In
                  2021, the ultimate goal is to have established regional and
                  community-level SARAI hubs where farmers can easily go to for
                  up-to-date information, and to report initial farm conditions.
                </p>
                <div className="mt-10">
                  <Link href="/services" passHref>
                    <button
                      className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition duration-300"
                    >
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

"use client";
import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { Banana, Bean, CircleDot } from 'lucide-react';
import Navigation from "../navigation";

const data = [
  {
    title: "Banana",
    description:
      "Banana is one of Davao's top commodities. Known for its quality and abundance, Davao produces some of the finest bananas in the country.",
    button_title: "Explore Banana",
    button_link: "https://www.example.com/banana",
    button_icon: <Banana className="h-6 w-6" />,
  },
  {
    title: "Coffee",
    description:
      "Davao is renowned for its rich and flavorful coffee beans. With its ideal climate and fertile soil, coffee farming thrives in the region.",
    button_title: "Explore Coffee",
    button_link: "https://www.example.com/coffee",
    button_icon: <Bean className="h-6 w-6" />,
  },
  {
    title: "Cacao",
    description:
      "Cacao cultivation is flourishing in Davao, making it a hub for high-quality cacao beans. Davao's cacao products are sought after for their distinct taste.",
    button_title: "Explore Cacao",
    button_link: "https://www.example.com/cacao",
    button_icon: <CircleDot className="h-6 w-6" />,
  },
];

export default function Commodities() {
  return (
    <>
      <Navigation />
      <section className="max-w-contentContainer py-24 mx-auto lgl:mt-20 sml:mt-10 sm:mt-10 mdl:py-24 flex flex-col gap-4 lgl:gap-8 mdl:px-10 xl:px-4">
        <div className="container">
          <SectionTitle
            title={"Davao's Top Commodities"}
            fontSize={"text-4xl lgl:text-5xl md:text-4xl sm:text-3xl xs:text-2xl"}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {data.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center items-center">
                  {item.button_icon}
                </div>
                <h3 className="text-2xl font-semibold my-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-6 flex justify-center">
                  <a
                    href={item.button_link}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    {item.button_title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { Banana, Bean, CircleDot } from 'lucide-react';
import Navigation from "../navigation";
import Footer from "../footer";

const data = [
  {
    title: "Banana",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    button_title: "Explore Banana",
    button_link: "https://dev-upminaavclab.pantheonsite.io/applications-for-banana",
    button_icon: <Banana className="h-6 w-6" />,
  },
  {
    title: "Coffee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    button_title: "Explore Coffee",
    button_link: "https://dev-upminaavclab.pantheonsite.io/coffeeapps",
    button_icon: <Bean className="h-6 w-6" />,
  },
  {
    title: "Cacao",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    button_title: "Explore Cacao",
    button_link: "https://dev-upminaavclab.pantheonsite.io/applications-for-cacao",
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
            title={"Commodities"}
            fontSize={"text-4xl lgl:text-5xl md:text-4xl sm:text-3xl xs:text-2xl mt-20 md:mt-0"}
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
      <Footer />
    </>
  );
}

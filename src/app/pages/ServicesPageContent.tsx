"use client"
import React from "react";
import CustomButtonTarget from "@/components/CustomButtonTarget";
import SectionTitle from "@/components/SectionTitle";

import { Banana, Bean, CircleDot } from 'lucide-react';

const data = [
  {
    delay: 0.2,
    title: "Coffee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    button_title: "VIEW APPS",
    button_link: "https://dev-upminaavclab.pantheonsite.io/coffeeapps/",
    button_icon: <Bean className="h-6 w-6" />,
  },
  {
    delay: 0.3,
    title: "Banana",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    button_title: "VIEW APPS",
    button_link:
      "https://dev-upminaavclab.pantheonsite.io/applications-for-banana/",
    button_icon: <Banana className="h-6 w-6" />,
  },
  {
    delay: 0.4,
    title: "Cacao",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    button_title: "VIEW APPS",
    button_link:
      "https://dev-upminaavclab.pantheonsite.io/applications-for-cacao/",
    button_icon: <CircleDot className="h-6 w-6" />,
  },
];

export default function ServicesPageContent() {
  return (
    <>
      <SectionTitle
        title={"COMMODITIES"}
        fontSize={"text-4xl lgl:text-5xl md:text-4xl sm:text-3xl xs:text-2xl"}
      />
      <div className="flex justify-center items-center flex-col xs:flex-col sm:flex-col sml:flex-col md:flex-col mdl:flex-row lg:flex-row lgl:flex-row xl:flex-row py-10">
        {data.map((item, index) => (
          <>
            <SectionTitle title={item.title} fontSize={"text-2xl"} />
            <p className="my-4 mx-4">{item.description}</p>
            <CustomButtonTarget
              icon={item.button_icon}
              hoverClass={
                "font-semibold hover:bg-green-300 hover:text-bodyColor"
              }
              title={item.button_title}
              link={item.button_link}
            />
          </>
        ))}
      </div>
    </>
  );
}

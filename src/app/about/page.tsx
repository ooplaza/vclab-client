"use client";
import React from "react";
import SectionTitle from "@/components/SectionTitle";
import Navigation from "../navigation";

export default function page() {
  return (
    <>
      <Navigation />
      <section className="max-w-contentContainer py-24 mx-auto lgl:mt-20 sml:mt-10 sm:mt-10 mdl:py-24 flex flex-col gap-4 lgl:gap-8 mdl:px-10 xl:px-4">
        <div className="container">
          <SectionTitle
            title={"Program Overview"}
            fontSize={
              "text-4xl lgl:text-5xl md:text-4xl sm:text-3xl xs:text-2xl mb-10"
            }
          />
          <div className="text-center">
            <SectionTitle
              title={
                "Enhancing the Value Chain Project Designs for Coffee, Cacao, and Cavendish Banana Towards the Development of Agri-Aqua Value Chain Laboratory in UP Mindanao"
              }
              fontSize={"text-xl"}
            />
          </div>
          <p className="mt-10">
            This program will contribute to new ways of evaluation that
            account for the dynamics in the chain and develop models to aid
            decision-making and develop more effective upgrading strategies
            considering emerging and critical concerns like sustainability,
            resiliency and inclusiveness. Build on the findings of previous
            initiatives of UP Mindanao related to cacao, coffee, and cavendish
            banana Based on the program’s findings, a framework for other
            commodity chains may be established and used as the basis for
            intervention. Institutional innovation can be developed for
            developing effective link of value chain design and implementation
            (e.g., VC Lab) Innovative ways to evaluate value chains will be
            introduced including : (1) Agent-based modeling, (2) Supply chain
            network designs (SCND), (3) Agri-food chain applications for
            decision-making (i.e., prototype mobile apps), (4) Improve on
            existing upgrading strategies.
          </p>

          <div className="text-center mt-20">
            <SectionTitle title={"Project 1"} fontSize={"text-3xl"} />
            <div className="mb-10">
              <SectionTitle
                title={"Project Leader: Dr. Larry N. Digal"}
                fontSize={"text-md font-semibold"}
              />
              <SectionTitle
                title={"Science Research Specialist II: Marvin Louie Orbeta"}
                fontSize={"text-md font-semibold"}
              />
            </div>
            <SectionTitle
              title={
                "Value Chain Analysis and Development: Cacao, Coffee, and Cavendish Banana"
              }
              fontSize={"text-xl"}
            />
          </div>
          <p className="mt-10">
            For the three chains, updating includes utilizing previous survey
            data to examine the role of consolidation and clusters. Factors
            affecting the decision to cluster will be examined using a logit
            model. A technical efficiency model will also be estimated to
            analyze the role of clusters in enhancing efficiency. A new survey
            will be conducted for cacao which will be used in agent-based
            modelling in component 2 as well as in the analysis of clusters.
            Training and workshops on value chain analysis and development
            will be conducted for a selected group of researchers and
            practitioners. Stakeholder workshops will also be conducted to
            present research outputs. These capacity building activities and
            stakeholder engagement form part and parcel of developing a value
            chain laboratory for the agri-food sector.
          </p>

          <div className="text-center mt-20">
            <SectionTitle title={"Project 2"} fontSize={"text-3xl"} />
            <div className="mb-10">
              <SectionTitle
                title={"Project Leader: Dr. Giovanna Fae Oguis"}
                fontSize={"text-md font-semibold"}
              />
              <SectionTitle
                title={"Project Staff: El Veena Grace Rosero"}
                fontSize={"text-md font-semibold"}
              />
              <SectionTitle
                title={"Science Research Analyst: Novy Aila Rivas"}
                fontSize={"text-md font-semibold"}
              />
            </div>
            <SectionTitle
              title={
                "Value Chain Modelling and Simulations: Cacao, Coffee, and Cavendish Banana"
              }
              fontSize={"text-xl"}
            />
          </div>
          <p className="mt-10">
            This project aims to develop models of agri-food value chains that
            will aid decision-making and evaluation of the chain. This project
            will focus on developing models of at most three chains: Cavendish
            banana, coffee, and cacao. Studying these value chains in UP
            Mindanao is not new. However, this project aims to incorporate the
            data gathered from previous studies (CHED-funded study on
            Cavendish banana value chain; DOST-PCIEERD-funded project on the
            coffee value chain; CHED-funded and PCARRD-UP Mindanao-funded
            projects for cacao value chain) to develop further models that
            will support in the improvement of the studied chains.
          </p>
          <div className="text-center mt-20">
            <SectionTitle title={"Project 3"} fontSize={"text-3xl"} />
            <div className="mb-10">
              <SectionTitle
                title={"Project Leader: Jon Henly O. Santillan"}
                fontSize={"text-md font-semibold"}
              />
              <SectionTitle
                title={"Science Research Analyst: Alex John Labanon"}
                fontSize={"text-md font-semibold"}
              />
            </div>
            <SectionTitle
              title={
                "Data analytics for the Cacao, Coffee, and Cavendish Banana Value Chains"
              }
              fontSize={"text-xl"}
            />
          </div>
          <p className="mt-10">
            This project covers the data analytics component of the proposed
            program. It will build on the updated analysis of the banana
            (Cavendish banana), cacao, and coffee value chains by developing
            decision support platform based on an analysis of issues in the
            value chains, previous outputs of mathematical models (e.g.,SCND),
            previous technologies developed (e.g., Kape Analytics), and data
            analytics modules for selected crops. The technologies will be
            tested and built as a validated prototype. The prototype testing
            will include testing with small-scale farmers of the selected
            crops to validate model results and ease of use of the
            application. The capacity building activities will be based on the
            user manual of the application featuring how it provides insights
            for decision-making at the farm-level. Trainings and workshops
            will be conducted for its users. Technology pitch can be created
            to drum up investment support from potential investors. The
            stakeholder workshops will be a venue to present the capabilities
            of the prototype to gain interest and possible future investments
            from government or the private sector. The prototype(s) can also
            further be developed as a commercial technology through incubator
            programs. Project 3 will contribute to the large gap in A4.0
            technologies in the three selected commodities.
          </p>
        </div>
      </section>
    </>
  );
}

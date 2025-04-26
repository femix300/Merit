import React from "react";
import { Link } from "react-router-dom";
import UniversitiesList from "../features/universities/UniversitiesList";

function About() {
  return (
    <div className="container flex flex-col mx-auto items-center justify-center max-w-[1200px]">
      <h1 className="font-extrabold text-2xl py-4">About Us</h1>
      <div className="px-3">
        <p className="text-start">
          At Merit, we are dedicated to empowering students on their educational
          journey. Understanding the complexities of university admissions can
          be overwhelming, which is why we've developed an innovative platform
          that simplifies the process.
        </p>
        <p>
          Our mission is to help students calculate their aggregate scores
          accurately and assess their chances of admission to their desired
          universities. We believe that every student deserves a chance to
          pursue their dreams without the stress of uncertainty. By providing
          easy-to-use tools and resources, we guide students in making informed
          decisions about their academic futures. With Merit, you can focus on
          what truly matters—achieving your goals and shaping your future.
        </p>
        <br />
        <br />
        <p>Join us at Merit, where we turn aspirations into achievements!</p>
        <Link to="/service/aggregate-calculator" className="text-blue-500">
          Click Here
        </Link>
        <br /> <br />
        <UniversitiesList />
      </div>
    </div>
  );
}

export default About;

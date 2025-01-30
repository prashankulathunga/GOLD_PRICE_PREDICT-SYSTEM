import React from "react";
import { DocumentIcon, UsersIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const About = () => {
  const iconBlocks = [
    {
      title: "Comprehensive Documentation",
      description:
        "Access industry-leading documentation and libraries to build custom integrations efficiently.",
      icon: <DocumentIcon className="w-6 h-6" />,
    },
    {
      title: "Community-Driven Support",
      description:
        "Join a thriving developer community contributing to open-source projects and fostering growth.",
      icon: <UsersIcon className="w-6 h-6" />,
    },
    {
      title: "Affordable and Scalable",
      description:
        "From small businesses to large enterprises, our solutions are designed to be cost-effective and scalable.",
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="relative overflow-hidden py-14 bg-yellow-50/30" id="about">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-24 mx-auto">
        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div className="lg:w-3/4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-black to-gray-400 lg:text-6xl drop-shadow-xl">
              Innovative <br />
              Tools for <span className="text-yellow-400">#Better</span>{" "}
              <br />
              User Experiences
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              We empower businesses to turn ideas into reality by designing and
              delivering the tools they need to thrive in the digital world.
            </p>
            <p className="mt-6">
              <a
                className="inline-flex items-center font-semibold text-blue-600 text-md gap-x-1 hover:underline focus:outline-none"
                href="#"
              >
                Contact to learn more
                <svg
                  className="shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </p>
          </div>

          {/* Right Content */}
          <div className="space-y-6 lg:space-y-10">
            {iconBlocks.map((block, index) => (
              <div
                className="flex p-4 transition-all duration-300 drop-shadow-xl rounded-xl gap-x-5 sm:gap-x-8 hover:bg-yellow-50/20 hover:p-8 hover:drop-shadow-lg"
                key={index}
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full shadow-sm text-amber-400 bg-yellow-50 shrink-0">
                  {block.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{block.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
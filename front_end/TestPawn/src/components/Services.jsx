import React from "react";
import Chart from "./application/Chart.jsx";

const Services = () => {
  const featuresList = [
    {
      title: "Accurate Predictions",
      description: "Easy & fast designing",
    },
    {
      title: "Efficient Workflow Management",
      description: "Powerful features",
    },
    {
      title: "User-Centric Design",
      description: "User Experience Design",
    },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-40 mx-auto">
          {/* Grid Layout */}
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">



          <div>
              <Chart />
            </div>

            
            {/* Content Column */}
            <div className="mt-5 sm:mt-10 lg:mt-0" id="system">
              <div className="space-y-6 sm:space-y-8">
                {/* Title Section */}
                <div className="space-y-2 md:space-y-4">
                  <h2 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-black to-gray-400 lg:text-5xl drop-shadow-xl">
                    How Our{" "}
                    <span className="text-yellow-400">#System</span> Works
                  </h2>
                  <blockquote className="relative p-6 ml-4 rounded-lg border-l-yellow-400 bg-gray-50/30 border-s-4 ps-4 sm:ps-6 ">
                    <p className="text-gray-500 text-md">
                      Our application is designed to revolutionize the way
                      pawning centers operate by providing actionable insights,
                      efficient tools, and user-friendly interfaces. Whether
                      you're a startup or an established enterprise, our
                      platform tackles the unique challenges of managing
                      gold-based assets, empowering businesses with:
                    </p>
                  </blockquote>
                </div>
                {/* End Title Section */}

                {/* Features List */}
                <ul className="ml-10 space-y-2 sm:space-y-4">
                  {featuresList.map((feature, index) => (
                    <li className="flex gap-x-3" key={index}>
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-yellow-50 text-amber-400 border-yellow-400">
                        <svg
                          className="shrink-0 size-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <div className="grow">
                        <span className="text-sm text-gray-500 sm:text-base">
                          <span className="font-bold">{feature.title}</span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* End Features List */}
              </div>
            </div>
            {/* End Content Column */}

            {/* Chart Column */}
          </div>
          {/* End Grid Layout */}
        </div>
      </div>
    </>
  );
};

export default Services;

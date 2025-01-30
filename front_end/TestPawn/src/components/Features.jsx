import React from "react";

const Features = () => {
  const stats = [
    {
      title: "Accuracy Rate",
      value: "99.95%",
      description: "Achieved in fulfilling orders with precision.",
    },
    {
      title: "Startup Businesses",
      value: "2,000+",
      description: "Trusted by growing businesses worldwide.",
    },
    {
      title: "Happy Customers",
      value: "85%",
      description: "Satisfaction rate this year alone.",
    },
  ];

  return (
    <div className="bg-gray-900/90" id="features">
      <div className="max-w-3xl mx-auto text-center pt-28">
        {/* Title Section */}
        <h2 className="text-3xl font-bold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-yellow-400 via-white/80 to-gray-50 drop-shadow-lg">
          Trusted by Pawning Businesses
        </h2>
        <p className="mt-4 text-gray-400 sm:text-md">
          Discover why leading pawning centers and startups rely on us for
          accurate predictions, seamless workflows, and unparalleled insights.
        </p>
      </div>

      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 lg:py-24 mx-auto -mt-14">
        {/* Grid Section */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-12 lg:gap-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <h4 className="text-xl font-semibold text-gray-400 sm:text-2xl drop-shadow-lg">
                {stat.title}
              </h4>
              <p className="mt-3 text-5xl font-extrabold text-yellow-400 sm:mt-4 sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 text-gray-300 text-md sm:text-lg">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        {/* End Grid Section */}
      </div>
    </div>
  );
};

export default Features;

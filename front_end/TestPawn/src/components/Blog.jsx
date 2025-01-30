import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      image:
        "https://images.pexels.com/photos/6927338/pexels-photo-6927338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Advanced Pawning Mechanism",
      description:
        "Accurate valuation, risk automation, and personalized loan recommendations to enhance efficiency and profitability.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2011/03/25/13/04/gold-chain-5933_1280.jpg",
      title: "3-Month Gold Price Predictions",
      description:
        "Mid-term strategies for optimal returns, helping pawning centers align loans with market trends for better outcomes.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2024/02/19/11/27/cross-8583223_1280.jpg",
      title: "6-Month Gold Price Predictions",
      description:
        "Mid-term strategies for optimal returns, helping pawning centers align loans with market trends for better outcomes.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2017/02/22/18/29/jewelry-2090198_1280.jpg",
      title: "12-Month Gold Price Predictions",
      description:
        "Long-term forecasting for business stability, empowering future planning with confidence and stability.",
    },
  ];

  return (
    <div className="py-10 bg-gradient-to-r from-gray-50 via-white to-gray-50" id="solutions">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto py-28">
        {/* Title */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-6xl drop-shadow-xl">
            Our Expert <span className="text-yellow-500">#Solutions</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Empowering businesses with data-driven insights and innovative tools to maximize growth and efficiency.
          </p>
        </div>
        {/* End Title */}

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, index) => (
            
            <div
              key={index}
              className="relative flex flex-col h-full transition duration-300 bg-[#ecf0f1] shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] border border-gray-200 rounded-xl hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={post.image}
                  alt={`${post.title} image`}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="flex-1 p-5">
                <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{post.description}</p>
              </div>
              <div className="flex items-center p-5 mt-auto border-t border-gray-200">
              <span class="inline-flex items-center justify-center size-[2rem] text-sm font-semibold leading-none rounded-full bg-black/20 text-white">
  PA
</span>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Pawning Analytics</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End Blog Grid */}
      </div>
    </div>
  );
};

export default Blog;

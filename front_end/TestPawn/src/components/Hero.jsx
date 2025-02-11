import React from "react";
import { useNavigate } from "react-router-dom";
import arrowIMG from "../assets/arrow1.png";
import leftArrowIMG from "../assets/arrow2.png";

const Hero = () => {
  const mailtoHref =
    "mailto:prashan.kulatunge@gmail.com?subject=SendMail&body=Description";

  const navigate = useNavigate();

  return (
    <>
      <section className="relative h-screen bg-gradient-to-r from-yellow-100 via-gray-300 to-gray-400 ">
        <div className="relative px-4 py-[4rem] mx-auto max-w-screen-2xl sm:px-6 lg:px-8 top-32">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            {/* Text Section */}
            <div className="p-6 md:p-12 lg:px-20 lg:py-20">
              <div className="max-w-lg mx-auto text-center md:mx-0 md:text-left">
                <h2 className="mb-6 text-2xl font-extrabold text-transparent lg:text-7xl md:text-6xl drop-shadow-2xl">
                  <span className="space-y-12">
                    <span className="bg-clip-text bg-gradient-to-r text-8xl from-yellow-500 via-gray-900 to-gray-500">
                      Revolutionize
                    </span>
                    <br />
                    <span className="text-6xl text-gray-400 border-b drop-shadow-md border-b-yellow-400">
                      Your Decisions
                    </span>
                  </span>
                  <br />
                  <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-black/80 to-gray-600 drop-shadow-md">
                    Making with ANN Insights
                  </span>
                </h2>

                <blockquote className="relative pl-4 ml-4 border-l-4 border-yellow-400 rounded-lg">
                  <p className="mb-6 leading-relaxed text-gray-400 text-md">
                   
                      Gain powerful insights into gold prices, risks, and market
                      trends. Make smarter decisions and achieve financial
                      success effortlessly.
                  
                  </p>
                </blockquote>

                <div className="flex gap-4 mt-12">
                  {/* Email Us Button */}
                  <button className="px-8 py-4 text-white font-bold rounded-md cursor-pointer border-0 bg-yellow-400 shadow-[0_0_8px_rgba(0,0,0,0.05)] tracking-wide uppercase text-sm transition-all duration-500 ease-in-out hover:tracking-[3px] hover:bg-yellow-400 hover:text-white hover:shadow-[0px_7px_29px_0px_rgba(255,223,0)] active:tracking-[3px] active:bg-yellow-400 active:text-white active:shadow-none active:transform active:translate-y-[10px] active:transition-[100ms]">
                    <a className="w-full h-full" href={mailtoHref}> Send Email </a>
                  </button>

                  {/* Signup Button */}
                  <button
                    onClick={() => navigate("/login")}
                    className="px-10 py-4 font-bold rounded-md cursor-pointer border-0 bg-white shadow-[0_0_8px_rgba(0,0,0,0.05)] tracking-wide uppercase text-sm transition-all duration-500 ease-in-out hover:tracking-[3px] hover:bg-yellow-400 hover:text-white hover:shadow-[0px_7px_29px_0px_rgba(255,223,0)] active:tracking-[3px] active:bg-yellow-400 active:text-white active:shadow-none active:transform active:translate-y-[10px] active:transition-[100ms]"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <img
              className="absolute pb-14 w-72 right-32 grayscale drop-shadow-2xl"
              src={arrowIMG}
              alt=""
            />
            {/* <img
              className="absolute pb-24 w-48  left-[38rem] grayscale"
              src={leftArrowIMG}
              alt=""
            /> */}
            {/* <img
              className="absolute w-[80vh] pt-24 right-56 drop-shadow-2xl mt-12"
              src={squreIMG}
              alt=""
            /> */}  

            {/* Chat Section */}

            <ul className="space-y-5 ">
              {/* Chat 1 */}

              {/* Chat 2 */}

              <li className="relative flex max-w-lg gap-x-2 sm:gap-x-4 me-11 transition ease-in-out hover:scale-[1.03] duration-700">
                <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600 ">
                  <span className="text-sm font-bold leading-none text-white">
                    PA
                  </span>
                </span>

                <div className="p-4 space-y-3 text-white bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl drop-shadow-2xl">
                  <h2 className="font-medium text-gray-100">
                    How can we help?
                  </h2>
                  <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                    <li className="text-sm text-gray-400">
                      What's Pawning Analytics?
                    </li>
                    <li className="text-sm text-gray-400">
                      How many features & examples are there?
                    </li>
                    <li className="text-sm text-gray-400">
                      Is there a PRO version?
                    </li>
                  </ul>
                </div>
              </li>

              {/* Chat 2 */}
              <li className="flex ms-auto gap-x-2 sm:gap-x-4 transition ease-in-out hover:scale-[1.03] duration-700">
                <div className="space-y-3 text-end">
                  <div className="relative inline-block p-4 bg-yellow-500 shadow-xl rounded-2xl z-23 drop-shadow-2xl">
                    <p className="text-sm text-white">
                      What's Pawning Analytics?
                    </p>
                  </div>
                </div>

                <img
                  className="relative inline-block rounded-full size-9 z-324"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
              </li>

              {/* Chat 3 */}
              <li className="relative flex max-w-lg gap-x-2 sm:gap-x-4 me-11 transition ease-in-out hover:scale-[1.03] duration-700">
                <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                  <span className="text-sm font-bold leading-none text-white">
                    PA
                  </span>
                </span>

                <div className="p-4 space-y-3 text-white bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl drop-shadow-2xl">
                  <p className="text-sm text-gray-400">
                    Pawning Analytics provides real-time insights to optimize
                    loans, manage risks, and boost profitability for pawning
                    centers.
                  </p>
                  <ul>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/signup");
                        }}
                        className="text-sm font-medium text-yellow-500 underline decoration-2"
                      >
                        Take the First Step
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

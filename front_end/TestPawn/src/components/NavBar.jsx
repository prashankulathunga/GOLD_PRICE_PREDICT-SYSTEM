import React, { useState } from "react";
import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";

const NavBar = () => {

const [banner, setBanner] = useState(true)

  
  return (
    <>
      {/* Notification Banner */}
      {banner && (
        <div className="fixed top-0 z-50 w-full px-4 py-2 font-medium text-gray-500 bg-gray-800">
        <div className="container flex items-center justify-between gap-4 mx-auto">
          <p className="text-sm ">
            Love Our System?&nbsp;🥰&nbsp;
            <a href="#" className="text-gray-400 underline hover:text-yellow-400">
              Check it out here!
            </a>
          </p>
          <button
            aria-label="Dismiss"
            className="p-1 text-gray-300 transition rounded-lg shrink-0 bg-black/30 hover:bg-gray-700" onClick={()=>setBanner(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      )}

      {/* Header */}
      <header className={`fixed ${banner ? "top-[44px]" : "top-0"}  w-full bg-white z-40`} >
        <div className="container max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a className="block text-gray-600" href="#">
              <span className="font-bold text-transparent text-md bg-clip-text bg-gradient-to-r from-yellow-800 via-black to-indigo-800">
                PAWNING ANALYTICS
              </span>
            </a>

            {/* Navigation */}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-yellow-500"
                    href="#solutions"
                  >
                    Solutions
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-yellow-500"
                    href="#about"
                  >
                    About
                  </a>
                </li>
                {/* <li>
                  <a
                    className="text-gray-500 transition hover:text-yellow-500"
                    href="#system"
                  >
                    System
                  </a>
                </li> */}
                <li>
                  <a
                    className="text-gray-500 transition hover:text-yellow-500"
                    href="#features"
                  >
                    Features
                  </a>
                </li>
              </ul>
            </nav>

            {/* Contact Button */}
            <div className="flex items-center gap-4">
              <div>
                <button class="btn inline-flex items-center justify-between bg-gray-900 min-w-[130px] border-0 rounded-md shadow-lg box-border px-5 py-3 text-white text-xs font-semibold tracking-wide uppercase overflow-hidden cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-95">
                  <i class="animation rounded-full animate-ripple"/><PhoneArrowUpRightIcon className="w-4 h-4 "/> <a className="w-full h-full" href="tel:+94778405854"> Call Us </a>
                  <i class="animation rounded-full animate-ripple"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;

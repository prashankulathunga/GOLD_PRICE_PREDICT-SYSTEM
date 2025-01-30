import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

const navigate = useNavigate();
    
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-gray-300 to-gray-400">
      <div className="flex items-center justify-center min-h-screen px-8 py-8 sm:px-12 lg:px-16 lg:py-12 ">
        <div className="max-w-xl px-12 py-16 bg-white rounded-lg shadow-lg lg:max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Sign <span className="text-yellow-400">Up</span>
          </h1>

          <hr className="mt-6 mb-12" />

          <form action="#" className="grid grid-cols-6 gap-6">
            {/* First Name */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="FirstName"
                name="first_name"
                placeholder="Prashan"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Last Name */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="LastName"
                name="last_name"
                placeholder="Kulathunga"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Email */}
            <div className="col-span-6">
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="email"
                placeholder="example@mail.com"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Password */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="password"
                placeholder="********"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Password Confirmation */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                placeholder="********"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Pawn ID */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="pawnId" className="block text-sm font-medium text-gray-700">
                Pawn ID
              </label>
              <input
                type="text"
                id="pawnId"
                name="pawnId"
                placeholder="12345"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Postal Code */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="123456"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Marketing Accept */}
            <div className="col-span-6">
              <label htmlFor="MarketingAccept" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="w-4 h-4 text-yellow-400 border-gray-200 rounded focus:ring-yellow-400"
                />
                <span className="text-sm text-gray-700">
                  I want to receive emails about events, product updates, and company announcements.
                </span>
              </label>
            </div>

            {/* Terms and Conditions */}
            <div className="col-span-6">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-yellow-500 underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-yellow-500 underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center col-span-6 gap-4 mt-8">
            <button  className="px-8 py-4 text-white font-bold rounded-md cursor-pointer border-0 bg-yellow-400 shadow-[0_0_8px_rgba(0,0,0,0.05)] tracking-wide uppercase text-sm transition-all duration-500 ease-in-out hover:tracking-[3px] hover:bg-yellow-400 hover:text-white hover:shadow-[0px_7px_29px_0px_rgba(255,223,0)] active:tracking-[3px] active:bg-yellow-400 active:text-white active:shadow-none active:transform active:translate-y-[10px] active:transition-[100ms]" onClick={()=>{navigate('/dashboard')}}>
                 Create an account
                </button>
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="text-yellow-500 underline">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;

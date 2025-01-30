const Login = ()=>{
    return (
        <>
        
        <section className="bg-gradient-to-r from-yellow-100 via-gray-300 to-gray-400">
      <div className="flex items-center justify-center min-h-screen px-8 py-8 sm:px-12 lg:px-16 lg:py-12">
        <div className="max-w-xl px-12 py-16 bg-white rounded-lg shadow-lg lg:max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Sign <span className="text-yellow-400">In</span>
          </h1>

          <hr className="mt-6 mb-12" />

          <form action="#" className="grid grid-cols-6 gap-6">
            

            {/* Email */}
            <div className="col-span-6">
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="email"
                placeholder="Enter Your Email Address"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Password */}
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="password"
                placeholder="Enter Your Password"
                className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Forgot Password */}
            <div className="col-span-6 -mt-4 text-right">
                <a
                  href="#"
                  className="text-sm text-yellow-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

            {/* Submit Button */}
            <div className="flex items-center col-span-6 gap-4 mt-8">
            <button  className="px-8 py-4 text-white font-bold rounded-md cursor-pointer border-0 bg-yellow-400 shadow-[0_0_8px_rgba(0,0,0,0.05)] tracking-wide uppercase text-sm transition-all duration-500 ease-in-out hover:tracking-[3px] hover:bg-yellow-400 hover:text-white hover:shadow-[0px_7px_29px_0px_rgba(255,223,0)] active:tracking-[3px] active:bg-yellow-400 active:text-white active:shadow-none active:transform active:translate-y-[10px] active:transition-[100ms]">
                 Login Account
                </button>
              <p className="text-sm text-gray-500">
                Are you new member?{" "}
                <a href="/signup" className="text-yellow-500 underline">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
        
        </>
    )
}

export default Login;
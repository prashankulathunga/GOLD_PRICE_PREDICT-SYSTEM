import { useState } from "react";
import { ArrowDownIcon, UserIcon, PhoneIcon, DocumentIcon } from "@heroicons/react/24/solid"; // Import icons
const PawnItem = () => {
  
const month_3 = 100000;
const month_6 = 200000;
const month_12 = 80000;

  
  const [weight, setWeight] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [material, setMaterial] = useState("");
  const [timeTest, setTimeTest] = useState("");
  const [cartage, setCartage] = useState("");

  const priceMaker = (weight, timePeriod, cartage)=>{
    let price = 0;
    if(weight > 0 && timePeriod > 0 && cartage > 0){
      const time = timePeriod.split(" ");
      console.log(' 1st one')
      if(time == 3){
        console.log('3 months')
        const new_month3 = (month_3/24) * cartage
        price = (weight/8 * new_month3)*(80/100);
      }
      if(time == 6){
        const new_month6 = (month_6/24) * cartage
        price = (weight/8 * new_month6)*(80/100);
      }
      if(time == 12){
        const new_month12 = (month_12/24) * cartage
        price = (weight/8 * new_month12)*(70/100);
      }
      price = price.toFixed(2);
      setTimeTest(price);
    }
  }

  const [errors, setErrors] = useState({});
  const [pawningItem] = useState([
    { name: "Prashan", pawnId: "12345", pawnValue: "209.76" },
    { name: "Kulathunga", pawnId: "12346", pawnValue: "150.00" },
    { name: "Randika", pawnId: "12347", pawnValue: "300.50" },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!timePeriod) formErrors.timePeriod = "Time period is required.";
    if (!weight || isNaN(weight) || weight <= 0)
      formErrors.weight = "Please enter a valid positive weight.";
    if (!material) formErrors.material = "Material type is required.";

    setErrors(formErrors);


    if (Object.keys(formErrors).length === 0) {
      // alert("Estimation submitted successfully!");
      // Add logic for estimation calculation or API submission here

      priceMaker(weight, timePeriod, cartage);
    }
  };

  return (
    
    <div className="grid grid-cols-1 gap-4">
      
      <div className="h-auto rounded-lg">
        <div className="grid items-center w-full h-full gap-6 md:grid-cols-6 sm:grid-cols-1">

          {/* Value Card */}
          <div className="grid h-80 col-span-2 transition-all duration-500 ease-in-out rounded-3xl bg-gradient-to-tr from-gray-800 via-gray-600 to-gray-700 drop-shadow-lg shadow-xl hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col items-center justify-center w-full h-full p-4 text-white">
              <h2 className="text-5xl font-[900] text-gray-200 drop-shadow-lg">
                <span className="font-sans text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-gray-400 to-gray-200 drop-shadow-lg">{timeTest ? timeTest: 0}</span> LKR
              </h2>
              <p className="p-4 text-sm text-center">
                Effortlessly determine the value of pawned items with precision and confidence.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="relative grid col-span-4 transition-all duration-500 ease-in-out border-r-8 rounded-lg shadow-md bg-gray-50 drop-shadow-xl hover:shadow-xl hover:scale-100 border-r-gray-600">
            <div className="flex items-center justify-between p-8">
              <div>
                <h2 className="mb-2 font-sans text-3xl font-bold text-gray-700 drop-shadow-lg">
                  Estimate Pawn Item Value
                </h2>
                <p className="text-sm text-yellow-500">
                 | Quickly estimate the value of pawned items with accuracy and ease.
                </p>
              </div>
            </div>
            <div className="p-8">
              <form onSubmit={handleFormSubmit}>
                <div className="grid gap-4 md:grid-cols-12 sm:grid-cols-1">

                  {/* Time Period Input */}
                  <div className="col-span-3">
                    <label htmlFor="timePeriod" className="block mb-2 text-sm font-medium text-gray-700">
                      Time Period (months)
                    </label>
                    <select
                      id="timePeriod" 
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="block w-full px-4 py-3 text-sm border-gray-100 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 bg-gray-50"
                    >
                      <option value="" disabled>
                        Select Month Count
                      </option>
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                    </select>
                    {errors.timePeriod && (
                      <p className="mt-2 text-sm text-red-500">{errors.timePeriod}</p>
                    )}
                  </div>

                  {/* Weight Input */}
                  <div className="col-span-3">
                    <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-700">
                      Weight (grams)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="block w-full px-4 py-3 text-sm border-gray-100 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 bg-gray-50"
                      placeholder="Enter weight"
                    />
                    {errors.weight && (
                      <p className="mt-2 text-sm text-red-500">{errors.weight}</p>
                    )}
                  </div>

                  {/* carrot tag */}


                  <div className="col-span-3">
                    <label htmlFor="cartage" className="block mb-2 text-sm font-medium text-gray-700">
                      Cartage
                    </label>
                    <select
                      id="cartage"
                      value={cartage}
                      onChange={(e) => setCartage(e.target.value)}
                      className="block w-full px-4 py-3 text-sm border-gray-100 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 bg-gray-50"
                    >
                      <option value="" disabled>
                        Select Cartage
                      </option>
                      <option value="24">24</option>
                      <option value="22">22</option>
                      <option value="18">18</option>
                    </select>
                    {errors.material && (
                      <p className="mt-2 text-sm text-red-500">{errors.material}</p>
                    )}
                  </div>

                  {/* Material Input */}
                  <div className="col-span-3">
                    <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-700">
                      Material Type
                    </label>
                    <select
                      id="material"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="block w-full px-4 py-3 text-sm border-gray-100 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 bg-gray-50"
                    >
                      <option value="" disabled>
                        Select Material
                      </option>
                      <option value="gold">Gold</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="stone">Stone</option>
                      <option value="earings">Earings</option>
                      <option value="chain">Chain</option>
                    </select>
                    {errors.material && (
                      <p className="mt-2 text-sm text-red-500">{errors.material}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end col-span-12 gap-20 mt-4">
                    {/* {timeTest !== "" && (
                      <div className="flex items-center justify-center h-12 p-4 text-xl font-bold bg-yellow-100 rounded-sm shadow-lg w-96">
                        {timeTest} LKR
                      </div>
                    )} */}
                    <button
                      type="submit"
                      className="w-1/4 px-4 py-3 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-gray-800 via-gray-600 to-gray-700 hover:bg-yellow-500 drop-shadow-lg"
                    >
                      <ArrowDownIcon className="inline w-5 h-5 mr-2" />
                      Estimate Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Form Section */}
      <div className="grid gap-6 mt-4 rounded-lg lg:grid-cols-2 sm:grid-cols-1 ">
        <div className="col-span-1 transition-all duration-500 ease-in-out rounded-lg bg-gray-50 hover:shadow-xl hover:scale-[1.02] ">
          <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-14">
            <div className="p-4 bg-gray-50 rounded-xl sm:p-7">
              <div className="mb-8 text-center">
                <h2 className="font-sans text-2xl font-bold text-gray-700 md:text-3xl drop-shadow-lg">
                  ADD Customer
                </h2>
                <p className="text-sm text-yellow-500 drop-shadow-md">
                  Manage your Customers.
                </p>
              </div>
              <form className="px-4">
                {/* Contact Section */}
                <div className="py-6 border-t border-gray-200 ">
                  <label htmlFor="customer-contact" className="inline-block text-sm font-medium">
                    Customer Contact
                  </label>
                  <div className="mt-2 space-y-3">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        id="customer-contact"
                        type="text"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Last Name"
                      />
                    </div>
                    <input
                      type="text"
                      className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="Phone Number"
                    />
                    <input
                      type="text"
                      className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="ID Number"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="py-6 border-t border-gray-200">
                  <label htmlFor="customer-address" className="inline-block text-sm font-medium">
                    Customer Address
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      id="customer-address"
                      type="text"
                      className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="Street Address"
                    />
                    <input
                      type="text"
                      className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="Apt, Suite, Building (Optional)"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions Section */}
                <div className="py-6 border-t border-gray-200 ">
                  <label className="inline-block text-sm font-medium text-gray-700">
                    Terms and Conditions
                  </label>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      By providing details, you agree to our{" "}
                      <a href="#" className="text-yellow-500 underline hover:text-yellow-700">
                        Terms and Conditions
                      </a>{" "}
                      and acknowledge our{" "}
                      <a href="#" className="text-yellow-500 underline hover:text-blue-700">
                        Privacy Policy
                      </a>
                      .
                    </p>
                    <div className="flex items-start mt-4">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                        I agree to the Terms and Conditions.
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-end w-full gap-4">
            <button
              type="button"
              className="flex items-center justify-center w-1/4 px-4 py-3 mb-8 -mt-12 text-sm font-bold text-center text-gray-600 border border-gray-600 rounded-lg gap-x-2 hover:bg-gray-800 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white"
            >
              <UserIcon className="w-5 h-5" />
              Find
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-1/4 px-4 py-3 mb-8 mr-8 -mt-12 text-sm font-bold text-white border border-transparent rounded-lg bg-gradient-to-r from-gray-800 via-gray-600 to-gray-700 gap-x-2 hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none drop-shadow-lg"
            >
              <DocumentIcon className="w-5 h-5" />
              ADD Customer
            </button>
          </div>
        </div>

        {/* Placeholder for Additional Content */}
        <div className="col-span-1 transition-all duration-500 ease-in-out rounded-lg bg-gray-50 hover:shadow-xl hover:scale-[1.02] ">
          <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-14">
            <div className="p-4 bg-gray-50 rounded-xl sm:p-7">
              <div className="mb-8 text-center">
                <h2 className="font-sans text-2xl font-bold text-gray-700 md:text-3xl drop-shadow-lg">
                  New Pawn Item
                </h2>
                <p className="text-sm text-yellow-500 drop-shadow-md">
                  Manage Pawn Item.
                </p>
              </div>
              <form className="px-4">
                {/* Pawn Item Details Section */}
                <div className="py-6 border-t border-gray-200 ">
                  <label htmlFor="pawn-item" className="inline-block text-sm font-medium">
                    Pawn Item Details
                  </label>
                  <div className="mt-2 space-y-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Item Name"
                      />
                      <select
                      id="cartage"
                      value={cartage}
                      onChange={(e) => setCartage(e.target.value)}
                      className="block w-full px-4 py-3 text-sm bg-gray-200 border-gray-100 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
                    >
                      <option value="" disabled>
                        Select Cartage
                      </option>
                      <option value="24">24</option>
                      <option value="22">22</option>
                      <option value="18">18</option>
                    </select>
                    </div>
                    <input
                      type="text"
                      className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="Customer ID"
                    />
                    <textarea
                      className="block w-full px-4 py-3 text-sm bg-gray-200 border-transparent rounded-lg focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                      rows="4"
                      placeholder="Note (damages)"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="number"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Weight (grams)"
                      />
                      <select
                        id="timePeriod"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        className="block w-full px-4 py-3 text-sm bg-gray-200 border-gray-100 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
                      >
                        <option value="" disabled>
                          Select Month Count
                        </option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                      </select>
                      
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Actual Price (USD)"
                      />
                      <input
                        type="number"
                        className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Loan Price (USD)"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions Section */}
                <div className="py-6 border-t border-gray-200">
                  <label className="inline-block text-sm font-medium text-gray-700">
                    Terms and Conditions
                  </label>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      By providing details, you agree to our{" "}
                      <a href="#" className="text-yellow-500 underline hover:text-yellow-700">
                        Terms and Conditions
                      </a>{" "}
                      and acknowledge our{" "}
                      <a href="#" className="text-yellow-500 underline hover:text-blue-700">
                        Privacy Policy
                      </a>
                      .
                    </p>
                    <div className="flex items-start mt-4">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                        I agree to the Terms and Conditions.
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-end w-full gap-4">
            <button
              type="button"
              className="flex items-center justify-center w-1/4 px-4 py-3 mb-8 mr-8 -mt-12 text-sm font-bold text-white border border-transparent rounded-lg bg-gradient-to-r from-gray-800 via-gray-600 to-gray-700 gap-x-2 hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none drop-shadow-lg"
            >
              <DocumentIcon className="w-5 h-5" />
              ADD Pawn Item
            </button>
          </div>
        </div>
      </div>

      {/* Active Pawn Items Table */}
      <div className="grid w-full p-8 mt-4 rounded-lg shadow-xl bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800 ">
          Active Pawn Items
        </h2>
        <table className="min-w-full mt-4 overflow-hidden border rounded-lg">
          <thead className="text-gray-200 bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-sm font-bold text-left">Name</th>
              <th className="px-6 py-3 text-sm font-bold text-left">Pawn ID</th>
              <th className="px-6 py-3 text-sm font-bold text-left">
                Value (USD)
              </th>
            </tr>
          </thead>
          <tbody>
            {pawningItem.map((item, index) => (
              <tr key={index} className="odd:bg-gray-100 hover:bg-yellow-50">
                <td className="px-6 py-4 text-sm">{item.name}</td>
                <td className="px-6 py-4 text-sm">{item.pawnId}</td>
                <td className="px-6 py-4 text-sm">{item.pawnValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PawnItem;

import { useState } from "react";
import { UserIcon, DocumentIcon } from "@heroicons/react/24/solid";

const InterestRate = () => {
  const [pawningItem] = useState([
    { name: "Prashan", pawnId: "12345", pawnValue: "209.76" },
    { name: "Kulathunga", pawnId: "12346", pawnValue: "150.00" },
    { name: "Randika", pawnId: "12347", pawnValue: "300.50" },
  ]);

  const [price, setPrice] = useState("");
  const [monthCount, setMonthCount] = useState("");
  const [errors, setErrors] = useState("");
  const [interest, setInterest] = useState("");
  const [week, setWeek] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!price) formErrors.price = "Price is required.";
    if (monthCount && week) formErrors.monthCount = "Only One Item.";

    setErrors(formErrors);

    const calculateInterest = (price, monthCount, week) => {
      let calInt = 0;

      // Calculate interest for 1 month
      if (monthCount > 0 && monthCount <= 1) {
        calInt = 0.03 * price;
      }
      // Calculate interest for more than 1 month
      else if (monthCount > 1) {
        calInt = 0.04 * monthCount * price;
      }
      // Calculate interest for weekly rate if week is true (checkbox checked)
      else if (week === true) {
        calInt = 0.01 * price;
      }

      // If interest is calculated, update the state
      if (calInt > 0) {
        calInt = parseFloat(calInt).toFixed(2); // Ensures two decimal points
        setInterest(calInt);
      } else {
        setInterest("No interest Display"); // Optional message when no interest
      }
    };

    if (Object.keys(formErrors).length === 0) {
      // alert("Estimation submitted successfully!");
      // Add logic for estimation calculation or API submission here
      calculateInterest(price, monthCount, week);
    }
  };

  return (
    <>
      <div className="grid h-[45vh] grid-cols-1 rounded-md">
        <div className="rounded-md drop-shadow-lg">
          <h2 className="p-8 text-xl font-bold text-gray-600 drop-shadow-xl">
            Interest Rate Calculation
          </h2>

          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-3 gap-6 px-8">
              <div className="h-[29vh] rounded-lg col-span-2">
                <div className="relative h-[17em] border-2 shadow-xl border-[rgba(169,169,169,0.5)] rounded-[1.5em] bg-gradient-to-tr from-gray-800 via-gray-600 to-gray-700 text-white font-nunito p-[1.6em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-gray-500/30 transition-all duration-500 group/card hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600/30 via-gray-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(169,169,169,0.1),transparent_60%)] group-hover/card:animate-pulse"></div>

                  <div className="absolute flex gap-2 top-4 right-4">
                    <div className="w-2 h-2 rounded-full bg-gray-300/50"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300/30"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300/10"></div>
                  </div>

                  <div className="flex items-center justify-between gap-6">
                    <div className="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-3">
                      <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent uppercase text-yellow-300">
                        About Rates
                      </h1>
                      <p className="text-[0.9em] text-gray-100/90 leading-relaxed font-light w-full border-r-2 border-r-gray-500/90 pt-2 px-4">
                        The increasing interest rate over time, where the rate
                        is,{" "}
                        <span className="font-medium text-gray-200">
                          3% for the first month
                        </span>
                        ,{" "}
                        <span className="font-medium text-gray-200">
                          4% after one month
                        </span>
                        , then{" "}
                        <span className="font-medium text-gray-200">
                          increases to 6% after one month and a half
                        </span>
                        , and additionally,{" "}
                        <span className="font-medium text-gray-200">
                          1% interest within the first week
                        </span>
                        .
                      </p>
                    </div>
                    <div className="w-full font-sans text-5xl font-extrabold text-center text-transparent pt-14 bg-clip-text bg-gradient-to-r from-yellow-400 via-gray-300 to-gray-200 drop-shadow-lg">
                      {interest ? interest : 0} LKR{" "}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-gray-200/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-gray-300/50 hover:shadow-lg hover:shadow-gray-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-gray-500/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-600/40 via-fuchsia-500/40 to-gray-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

                    <p className="relative z-10 font-medium tracking-wide">
                      Calculate Interest
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="relative z-10 w-5 h-5 group-hover/btn:translate-x-[10%] transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center col-span-1 gap-6 p-4 border-r-8 rounded-lg shadow-xl bg-gray-50 border-r-gray-600">
                {/* <div className="absolute w-1/2 rounded-full h-1/2 bg-gray-400/30 blur-3xl -z-10"></div> */}

                <div className="relative max-w-sm w-72">
                  <label
                    htmlFor="price"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    type="number"
                    id="price"
                    className="block w-full px-4 py-3 text-sm transition duration-200 border border-none rounded-lg focus:border-yellow-400 focus:ring focus:ring-yellow-400 bg-gray-50"
                    placeholder="Estimated Price"
                  />
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-500">{errors.price}</p>
                  )}
                </div>

                <div className="relative max-w-sm w-72">
                  <label
                    htmlFor="monthCount"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Month Count
                  </label>
                  <input
                    onChange={(e) => {
                      setMonthCount(e.target.value);
                    }}
                    type="text"
                    id="monthCount"
                    className="block w-full px-4 py-3 text-sm transition duration-200 border border-none rounded-lg focus:border-yellow-400 focus:ring focus:ring-yellow-400 bg-gray-50"
                    placeholder="Enter Month Count"
                  />
                  {errors.monthCount && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.monthCount}
                    </p>
                  )}
                </div>

                <div className="relative flex items-center justify-start max-w-sm gap-4 w-72">
                  <input
                    onChange={(e) => setWeek(e.target.checked)}
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="w-5 h-5 -mt-1 text-yellow-400 border-gray-200 rounded focus:ring-yellow-400"
                  />
                  <label
                    htmlFor="checkBox"
                    className="block text-sm font-medium text-gray-700 bg-gray-50"
                  >
                    Withing One week
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* add interest rate start */}

      <div className="w-full p-4 bg-white border-l-8 rounded-lg shadow-xl border-l-gray-600">
        <h2 className="p-4 font-bold ">Add Interest for Pawn Items</h2>

        <div className="grid w-full grid-cols-2 gap-4">
          <div className="w-full p-4 pr-8 border-r col-span1 left border-r-gray-50">
            {/* get pawn-item details start */}

            <form>
              <div className="py-6 border-gray-200 ">
              <label
                htmlFor="pawn-item"
                className="inline-block text-sm font-medium"
              >
                Pawn Item Details
              </label>
              <div className="mt-2 space-y-3">
                <input
                readOnly
                disabled
                  id="pawn-item"
                  type="text"
                  className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                  placeholder="Customer ID"
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    readOnly
                    disabled
                    type="text"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Item Name"
                  />
                  <input
                    type="number"
                    className="block w-full px-3 py-2 text-sm border-yellow-100 rounded-lg shadow-sm bg-yellow-50 focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Pawn Item ID"
                  />
                </div>
                <textarea
                  readOnly
                  disabled
                  className="block w-full px-4 py-3 text-sm bg-gray-200 border-transparent rounded-lg focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                  rows="4"
                  placeholder="Note (damages)"
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    readOnly
                    disabled
                    type="number"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Weight (grams)"
                  />
                  <input
                    readOnly
                    disabled
                    type="number"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-md shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Month Count"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    readOnly
                    disabled
                    type="text"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Actual Price (USD)"
                  />
                  <input
                    readOnly
                    disabled
                    type="number"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Loan Price (USD)"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    readOnly
                    disabled
                    type="text"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Need Payment"
                  />
                  <input
                    readOnly
                    disabled
                    type="number"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="cartage"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    readOnly
                    disabled
                    type="text"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Pawn Date"
                  />
                  <input
                    readOnly
                    disabled
                    type="number"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Due Date"
                  />
                </div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center float-right w-1/4 px-4 py-3 mt-10 mb-4 text-sm font-bold text-center text-gray-600 border border-gray-600 rounded-lg gap-x-2 hover:bg-gray-800 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white"
              >
                <UserIcon className="w-5 h-5" />
                Find
              </button>
            </div>
            </form>

            {/* get pawn-item details end */}
          </div>

          <div className="w-full p-6 pt-8 col-span1 right">
            {/* Add interest start */}

           
              <form>
              <label className="inline-block text-sm font-medium">Interest  Details</label>
            <div className="flex flex-col w-full gap-4 p-3 sm:flex-row">
                  <input
                    readOnly
                    disabled
                    type="text"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Customer ID"
                  />
                  <input
                    readOnly
                    disabled
                    type="number"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Pawn Item ID"
                  />
                </div>

                <div className="flex flex-col w-full gap-4 p-3 sm:flex-row">
                  <input
                  readOnly
                  disabled
                    type="text"
                    className="block w-full px-3 py-2 text-sm bg-gray-200 border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Full amount"
                  />
                  <input
                    type="number"
                    className="block w-full px-3 py-2 text-sm border-gray-100 rounded-lg shadow-sm bg-yellow-50 focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Pay amount"
                  />
                </div>

                <div className="p-6 mt-20">

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

                  
                <button
              type="button"
              className="flex items-center justify-center float-right w-1/4 px-4 py-3 mb-8 text-sm font-bold text-white border border-transparent rounded-lg bg-gradient-to-r from-gray-800 via-gray-600 to-gray-700 gap-x-2 hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none drop-shadow-lg"
            >
              <DocumentIcon className="w-5 h-5" />
              ADD Interest
            </button>
                </div>


                
              </form>
              


            {/* Add interest end */}
          </div>
        </div>
      </div>

      {/* add interest rate end */}

      <div className="grid min-h-[40vh] grid-cols-1 mt-8 bg-white rounded-lg drop-shadow-xl">
        <div className="grid w-full p-8 mt-4 rounded-lg shadow-xl bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800 ">
            Details of Interest Rates
          </h2>
          <table className="min-w-full mt-4 overflow-hidden border rounded-lg">
            <thead className="text-gray-200 bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-left">Name</th>
                <th className="px-6 py-3 text-sm font-bold text-left">
                  Pawn ID
                </th>
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
    </>
  );
};

export default InterestRate;

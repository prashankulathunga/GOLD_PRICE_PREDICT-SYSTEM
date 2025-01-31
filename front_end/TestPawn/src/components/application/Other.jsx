import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const Other = () => {
  return (
    <>
      {/* need to decrees cashBook */}

      <div className="p-4">
        <div className="grid grid-flow-col grid-cols-span-6">
          <div className="col-span-4">
            <h2 className="text-xl font-medium text-gray-900">
              Other Expenses Calculation
            </h2>
            <blockquote class="relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700">
              <p className="p-4 mt-4 text-sm leading-relaxed">
                This section is designed to track and calculate various
                operational expenses incurred by the pawning shop. These
                expenses are essential for maintaining the business and ensuring
                smooth financial operations.
              </p>
            </blockquote>
          </div>
          <div className="col-span-2 p-4 text-right">
            <h2 className="font-medium text-yellow-500 text-md">
              Total Other Expenses Day
            </h2>

            <h2 className="text-xl font-medium text-gray-900">125.00 USD</h2>
          </div>
        </div>

        <div className="p-8 mt-12">
          <form action="">
            <div className="flex space-x-4 ">
              {/* Input for Received Cash */}
              <div className="w-full space-y-3 ">
                <input
                  type="text"
                  className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter received cash"
                />
              </div>

              {/* Input for Another Cash Amount */}
              <div className="w-full space-y-3">
                <input
                  type="text"
                  className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Note"
                />
              </div>

              <div className="w-full col-span-3">
                    <select
                      value=''
                      className="block w-full px-4 py-3 text-sm text-gray-600 bg-white border-gray-100 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
                    >
                      <option value="" disabled>
                        Select amount type
                      </option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>



              
            </div>

            <div className="flex items-center justify-center w-full mt-12">
                
            <button className="flex items-center justify-center flex-1 w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-lg sm:w-auto hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              Get Money <DocumentArrowDownIcon className="w-5 h-5 text-gray-500" />
            </button>
                
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Other;

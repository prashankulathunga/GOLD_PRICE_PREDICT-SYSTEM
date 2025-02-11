import Card from "../Card.jsx";
import Article from "./Article.jsx";
import ComparisonChart from "./ComparisonChart .jsx";
import PieChart from "./PieChart.jsx";
import LiveClockUpdate from "./LiveClockUpdate.jsx";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import Other from "./Other.jsx";

const Dashboard = () => {
  const data = [
    {
      id: 1,
      name: "John Brown",
      phone: "123-456-7890",
      address: "New York No. 1 Lake Park",
    },
    {
      id: 2,
      name: "Jim Green",
      phone: "987-654-3210",
      address: "London No. 1 Lake Park",
    },
    {
      id: 3,
      name: "Joe Black",
      phone: "555-123-4567",
      address: "Sidney No. 1 Lake Park",
    },
    {
      id: 4,
      name: "Edward King",
      phone: "111-222-3333",
      address: "LA No. 1 Lake Park",
    },
    {
      id: 5,
      name: "Jim Red",
      phone: "999-888-7777",
      address: "Melbourne No. 1 Lake Park",
    },
  ];

  return (
    <>
      {/* Dashboard Cards */}
      <article class="w-full  bg-gray-100 shadow p-2 space-y-2 rounded-md hover:-translate-y-2 duration-300 flex gap-2 border-l-4 border-l-gray-600">
        <ShieldCheckIcon className="w-6 h-8 text-gray-700 drop-shadow-lg" />

        <p class="text-sm w-full text-gray-700 drop-shadow-lg">
          Pawning Analytics provides data-driven insights to help you make
          informed decisions in the pawning industry, optimizing pricing,
          trends, and market strategies.
        </p>
      </article>

      <hr className="w-40 mb-6 border-gray-100" />

      <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
        {["1230.87", "980.43", "800.98", "750.47"].map((value, index) => (
          <div
            key={index}
            className="transition-shadow duration-300 rounded-lg shadow-lg h-36 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl"
          >
            <Card
              title={value}
              subtitle="24K Gold"
              desc={`Estimate (${[0, 3, 6, 12][index]} Months)`}
            />
          </div>
        ))}
      </div>

      {/* Pawning Analytics Section */}
      <div className="grid grid-cols-1 gap-6 mt-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative h-auto sm:h-[55vh] shadow-lg rounded-xl bg-cover bg-center hover:grayscale-0 transition-all duration-500">
          <div className="absolute inset-0 flex flex-col items-center justify-start p-8 border rounded-xl bg-gradient-to-tr from-gray-800 via-gray-600 to-gray-700">
            <div className="absolute w-1/2 rounded-full h-1/2 bg-amber-100/10 blur-3xl -z-12 top-1/3"></div>
            <LiveClockUpdate />
            <p className="max-w-lg mt-6 text-sm leading-relaxed text-center text-gray-200 md:text-base">
              <span className="font-semibold text-yellow-400">
                Pawning Analytics
              </span>{" "}
              delivers real-time market insights, empowering users to make
              smarter financial decisions.
            </p>
            <div className="mt-20 w-80">
              <p className="text-lg text-center text-gray-100 drop-shadow-lg">
                Total Gold Inventory
              </p>
              <Article amount="240.94" description="24K GOLD" />
            </div>
          </div>
        </div>
        <div
          className={`h-auto sm:h-[55vh] shadow-xl rounded-lg bg-gray-100 border-t-gray-600 border-t-8 `}
        >
          <h2 className="p-6 pt-6 text-lg font-medium text-gray-800">
            One Pound Prices
          </h2>
          <div className="flex flex-col justify-center px-6">
            <Article amount="240.94" description="24K GOLD" />
            <Article amount="150.50" description="22K GOLD" />
            <Article amount="150.50" description="18K GOLD" />
          </div>
        </div>
        <div
          className={`p-6 h-auto sm:h-[55vh] shadow-xl  rounded-lg bg-gray-100 col-span-2 border-t-8 border-t-gray-600 `}
        >
          <h2 className="p-4 text-lg font-medium text-gray-800">
            Predicted vs Actual Price Chart
          </h2>
          <ComparisonChart />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid w-full grid-cols-1 gap-6 rounded-lg lg:grid-cols-3">
        {/* Active Customers Table */}
        <div className="p-4 bg-white shadow-lg rounded-lg h-auto sm:h-[50vh] col-span-1 lg:col-span-2 drop-shadow-lg">
          <Other />
        </div>

        {/* Daily Income-Outcome Chart */}
        <div className="h-auto sm:h-[50vh] shadow-lg rounded-lg bg-white p-8 drop-shadow-lg ">
          <h2 className="px-4 text-lg font-medium text-gray-800">
            Daily Income-Outcome
          </h2>
          <div className="flex items-center justify-center h-full">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 w-full h-[50vh] mt-8 drop-shadow-xl shadow-xl rounded-lg p-4 ">
        <h2 className="p-4 text-lg font-medium text-gray-800">
          CashBook
        </h2>
        <div className="flex flex-col pt-2 overflow-x-auto">
          <table className="min-w-full overflow-hidden border rounded-lg">
            <thead className="text-gray-200 bg-gray-800">
              <tr>
                {["Name", "T:Phone", "Address", "Action"].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-xs font-bold text-gray-200 uppercase text-start"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-yellow-50 odd:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.address}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="flex items-center text-blue-500 hover:text-blue-700">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

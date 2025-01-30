import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid"; // Import icons

const InterestRateCalculator = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [interestRate, setInterestRate] = useState(null);
  const [errors, setErrors] = useState({});

  const calculateInterestRate = (amount, term) => {
    if (!amount || isNaN(amount) || amount <= 0 || !term || isNaN(term) || term <= 0) {
      return 0;
    }

    // Example logic for interest rate calculation
    let rate = 0;
    if (term <= 3) {
      rate = 5; // 5% for amounts less than $1000
    } else if (term <= 6) {
      rate = 4; // 4% for amounts $1000-$5000
    } else {
      rate = 3; // 3% for amounts $5000 and above
    }
    // Adjust rate based on term, if necessary
    return rate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!amount || isNaN(amount) || amount <= 0) {
      formErrors.amount = "Please enter a valid positive amount.";
    }
    if (!term || isNaN(term) || term <= 0) {
      formErrors.term = "Please enter a valid positive term.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const rate = calculateInterestRate(amount, term);
      setInterestRate(rate);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">Interest Rate Calculator</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Loan Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter loan amount"
          />
          {errors.amount && <p className="mt-2 text-sm text-red-500">{errors.amount}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="term" className="block text-sm font-medium text-gray-700">
            Term (months)
          </label>
          <input
            type="number"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter term in months"
          />
          {errors.term && <p className="mt-2 text-sm text-red-500">{errors.term}</p>}
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600"
        >
          Calculate Interest Rate
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </form>

      {interestRate !== null && (
        <div className="w-full max-w-lg p-4 mt-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
          <p className="font-medium text-yellow-800">
            Calculated Interest Rate: <span className="font-bold">{interestRate}%</span>
          </p>
        </div>
      )}

      <footer className="mt-8 text-center text-gray-600">
        <p>&copy; 2025 Interest Rate Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InterestRateCalculator;

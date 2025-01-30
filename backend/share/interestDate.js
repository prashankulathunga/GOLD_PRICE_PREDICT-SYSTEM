// Helper function to calculate interest
const calculateInterest = (initialLoanAmount, daysActive) => {
    if (daysActive <= 7) return initialLoanAmount * 0.02;
    if (daysActive <= 15) return initialLoanAmount * 0.03;
    if (daysActive > 30) return initialLoanAmount * 0.05;
    return 0;
  };

  export default calculateInterest;
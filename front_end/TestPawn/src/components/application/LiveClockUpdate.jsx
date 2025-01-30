import React, { useState, useEffect } from "react";

const LiveClockUpdate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      <h2 className=" text-[2.6rem] font-extrabold text-gray-100 z-122 relative">{date.toLocaleTimeString()}</h2>
    </div>
  );
};

export default LiveClockUpdate;

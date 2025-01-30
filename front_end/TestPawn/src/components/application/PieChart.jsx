import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const chartOptions = {
    chart: {
      type: "pie",
      zoom: { enabled: false },
    },
    series: [70, 18, 12],
    labels: ["Income", "Outcome", "Others"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "16px", // Increased font size for better readability
        fontFamily: "Inter, ui-sans-serif",
        fontWeight: "300",
        colors: ["#ecf0f1", "#ecf0f1", "#ecf0f1"], // Ensure high contrast
      },
      dropShadow: { enabled: true },
      formatter: (value, { seriesIndex, w }) => {
        return `${w.config.labels[seriesIndex]}: ${value.toFixed(1)}%`;
      },
      position: "inside", // Ensure labels are inside the pie slices
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -20, // Adjusted to center-align labels better
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: ["#ffffff"],
        useSeriesColors: true,
        fontSize: "14px", // Adjusted legend font size
      },
    },
    stroke: {
      width: 4,
      colors: ["#ffffff"],
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value}%`,
      },
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
    },
    colors: ["#1F2937", "#f4d03f", "#e5e7eb"],
  };

  return (
    <div id="hs-pie-chart" className="flex justify-center">
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="pie"
        height="350" // Increased chart height
        width="350" // Increased chart width
      />
    </div>
  );
};

export default PieChart;

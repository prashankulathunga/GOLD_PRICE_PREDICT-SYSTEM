import { color } from "framer-motion";
import React from "react";
import Chart from "react-apexcharts";

const ChartComponent = () => {
  const chartOptions = {
    chart: {
      height: 300,
      type: "area",
      toolbar: { show: false},
      zoom: { enabled: false },
    },
    series: [
      {
        name: "Visitors",
        data: [180, 51, 60, 38, 88, 50, 40, 52, 88, 80, 60, 70],
      },
    ],
    colors: ["#FACC15"],
    dataLabels: { enabled: false },
    stroke: { curve: "straight", width: 2 },
    grid: { strokeDashArray: 2 },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8,
      },
    },
    xaxis: {
      type: "category",
      tickPlacement: "on",
      categories: [
        "25 Jan ",
        "26 Jan ",
        "27 Jan ",
        "28 Jan ",
        "29 Jan ",
        "30 Jan ",
        "31 Jan ",
        "1 Feb ",
        "2 Feb ",
        "3 Feb ",
        "4 Feb ",
        "5 Feb",
      ],
      labels: { style: { colors: "#9ca3af", fontSize: "13px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#9ca3af", fontSize: "13px" },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
    tooltip: {
      x: { format: "MMMM yyyy" },
      y: { formatter: (value) => `${value}` },
    },
    responsive: [
      {
        breakpoint: 568,
        options: {
          chart: { height: 300 },
          xaxis: {
            labels: { style: { fontSize: "11px" } },
          },
          yaxis: {
            labels: { style: { fontSize: "11px" } },
          },
        },
      },
    ],
  };

  return (
    <div className="chart-container">
      <Chart options={chartOptions} series={chartOptions.series} type="area" height={500} />
    </div>
  );
};

export default ChartComponent;

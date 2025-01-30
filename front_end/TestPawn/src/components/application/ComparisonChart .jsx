import React from "react";
import Chart from "react-apexcharts";

const ComparisonChart = () => {
  const chartOptions = {
    chart: {
      height: 300,
      type: "area",
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    series: [
      {
        name: "Actual",
        data: [18000, 5100, 6000, 3800, 8800, 5000, 4000, 5200, 8800, 8000, 
          60000, 70000, 70000, 80000, 50000, 50000, 50000, 50000, 50000, 60000],
      },
      {
        name: "Predicted",
        data: [2700, 3800, 6000, 7700, 4000, 5000, 4900, 29000, 4000, 2700, 
          6200, 6000, 790, 29000, 7000, 97000, 42000, 50000, 49000, 32113],
      },
    ],
    colors: ["#f2ca27", "#2c3e50"], // Colors for the series 2f3134
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
      categories: [
        "15 January",
        "15 February",
        "15 March",
        "15 April",
        "15 May",
        "15 June",
        "15 July",
        "15 August",
        "15 September",
        "15 October",
        "15 November",
        "15 December",
        "15 January",
        "15 February",
        "15 March",
        "15 April",
        "15 May",
        "15 June",
        "15 July",
        "15 August",
        "15 September",
        "15 October",
      ],
      labels: {
        style: { colors: "#9ca3af", fontSize: "13px" },
        formatter: (title) => {
          if (title) {
            const [day, month] = title.split(" ");
            return `${month.slice(0, 3)}`;
          }
          return title;
        },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9ca3af", fontSize: "13px" },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
    tooltip: {
      x: { format: "MMMM yyyy" },
      y: { formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}` },
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
      <Chart options={chartOptions} series={chartOptions.series} type="area" height={400} />
    </div>
  );
};

export default ComparisonChart;

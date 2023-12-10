import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = (props) => {
  const { label, data, dataSetLabel } = props;

  const chartRef = useRef(null);

  useEffect(() => {
    // Get the canvas element using useRef
    const ctx = chartRef.current.getContext("2d");

    // Create the chart
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: label,
        datasets: [
          {
            label: dataSetLabel,
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgb(255, 159, 64)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      myChart.destroy();
    };
  }, []); // Run this effect only once, similar to componentDidMount

  return <canvas ref={chartRef} width="500" height="500"></canvas>;
};

export default BarChart;

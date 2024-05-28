import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const month = ["January", "February", "March", "April", "May", "June", "July"];

export const Chart = ({
  data1 = [],
  data2 = [],
  title1,
  title2,
  bgcolor1,
  bgcolor2,
  horizontal = false,
  labels = month,
}) => {
  const options = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: title2 ? true : false,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: title1,
        data: data1,
        backgroundColor: bgcolor1 || "rgba(255, 99, 132, 0.5)",
      },
      {
        label: title2,
        data: data2,
        backgroundColor: bgcolor2 || "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

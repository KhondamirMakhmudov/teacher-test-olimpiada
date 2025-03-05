import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const IQTrendChart = () => {
  const { theme } = useTheme();
  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#008FFB", "#FF4560"],
    dataLabels: { enabled: false },
    grid: { borderColor: "#f0f0f0" },
    xaxis: {
      categories: [
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      labels: { style: { colors: theme === "light" ? "#999" : "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: theme === "light" ? "#999" : "#fff" } },
      title: {
        text: "O'rtacha IQ darajasi",
        style: { color: "#999" },
      },
    },
    // title: {
    //   text: "Dunyo bo'yicha erkaklar va ayollarning o'rtacha IQ darajasi (2005-2024)",
    //   align: "center",
    //   style: { fontSize: "16px", color: "#666" },
    // },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: { style: { colors: theme === "light" ? "#999" : "#fff" } },
    },
  };

  const series = [
    {
      name: "Erkaklar IQ",
      data: [
        99, 99.2, 99.4, 99.5, 99.6, 99.8, 100, 100.2, 100.3, 100.5, 100.6,
        100.8, 101, 101.1, 101.2, 101.3, 101.4, 101.5, 101.6, 101.7,
      ],
    },
    {
      name: "Ayollar IQ",
      data: [
        98, 98.3, 98.6, 99, 99.3, 99.6, 99.9, 100.2, 100.5, 100.8, 101, 101.2,
        101.4, 101.5, 101.6, 101.7, 101.8, 101.9, 102, 102.1,
      ],
    },
  ];

  return (
    <div className="w-full !dark:text-white !text-black ">
      <h1 className="text-lg font-semibold text-center dark:text-white text-black">
        Dunyo bo&apos;yicha erkaklar va ayollarning o&apos;rtacha IQ darajasi
        (2005-2024)
      </h1>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default IQTrendChart;

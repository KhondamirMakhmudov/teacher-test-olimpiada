import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RegistrationChart({ webCount = 54 }) {
  const chartOptions = {
    chart: { type: "donut" },
    labels: ["Telegram", "Web-sayt"],
    colors: ["#3b82f6", "#f59e0b"],
    legend: { show: false },
    tooltip: { enabled: true },
    dataLabels: { enabled: false },
    stroke: { show: false },
  };

  const chartSeries = [webCount];

  return (
    <div className=" p-5 dark:bg-[#243047] bg-white shadow-lg rounded-2xl border border-gray-200 dark:border-0 text-center flex justify-center items-center flex-col">
      <div className="text-3xl font-semibold text-gray-800 dark:text-white">
        {webCount}
      </div>
      <p className="text-gray-500 dark:text-gray-200">
        Umumiy ro‘yxatdan o‘tganlar soni
      </p>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={120}
      />
    </div>
  );
}

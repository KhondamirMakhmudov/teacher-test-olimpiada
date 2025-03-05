import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StudentRegistrationChart = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // 📌 API o'rniga vaqtinchalik ma'lumotlar (faqat Yanvar - Aprel)
  const series = [
    {
      name: "Ro‘yxatdan o‘tganlar",
      data: [45, 60, 40], // Yanvar - Aprel statistikasi
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#3b82f6"], // Moviy rang
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Fevral", "Mart", "Aprel"], // Faqat kerakli oylar
      labels: { style: { colors: isDarkMode ? "#cbd5e1" : "#64748b" } },
    },

    grid: {
      borderColor: isDarkMode ? "#475569" : "#e2e8f0",
      strokeDashArray: 4,
    },
  };

  return (
    <div
      className={`w-full mx-auto p-6 shadow-lg rounded-2xl border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <h3
        className={`text-lg font-semibold ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Ro‘yxatdan o‘tganlar
      </h3>
      <p
        className={`text-sm mb-2 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Fevral - Aprel oylari bo‘yicha statistikasi
      </p>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default StudentRegistrationChart;

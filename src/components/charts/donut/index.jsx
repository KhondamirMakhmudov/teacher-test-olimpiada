"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const DonutChart = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    labels: [
      "2.1 ballik savollar",
      "3.1 ballik savollar",
      "5.1 ballik savollar",
    ],
    colors: ["#20c997", "#f4a261", "#e76f51"],
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => val, // Show only values, no percentage
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: { show: true },
            value: { show: false }, // Hide value inside the donut
          },
        },
      },
    },
    dataLabels: {
      enabled: false, // This will completely hide percentages inside pieces
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
  };

  const series = [10, 10, 10]; // Question counts

  if (!mounted) return null;

  return (
    <div className="w-full mx-auto p-4 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-[#26334A] shadow-md border dark:border-none">
      <h2 className="text-lg font-semibold">Savollar</h2>
      <div className="flex flex-col justify-between space-y-[90px]">
        <div className="flex justify-center items-center">
          <Chart options={options} series={series} type="donut" width="320" />
        </div>

        <div className="flex justify-between ">
          <div className="flex items-end gap-x-3 md:gap-x-[12px]">
            <div className="bg-[#ECF2FF] p-2 md:p-[10px] rounded-[8px] inline-block">
              <Image src="/icons/grid.svg" alt="grid" width={24} height={24} />
            </div>
            <div>
              <h4 className="text-lg md:text-[21px] dark:text-white text-black font-semibold">
                103
              </h4>
              <p className="text-sm text-[#7C8FAC]">{t("totalScores")}</p>
            </div>
          </div>

          <div className="flex items-end gap-x-3 md:gap-x-[12px]">
            <div className="bg-[#ECF2FF] p-2 md:p-[10px] rounded-[8px] inline-block">
              <Image src="/icons/grid.svg" alt="grid" width={24} height={24} />
            </div>
            <div>
              <h4 className="text-lg md:text-[21px] dark:text-white text-black font-semibold">
                300
              </h4>
              <p className="text-sm text-[#7C8FAC]">Barcha savollar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;

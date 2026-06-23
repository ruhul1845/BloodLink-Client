"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ApexRequestChart({ data = [] }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setDark(root.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const series = useMemo(() => [{
    name: "Requests",
    data: data.map((item) => Number(item.requests || 0)),
  }], [data]);

  const options = useMemo(() => ({
    chart: {
      background: "transparent",
      fontFamily: "Inter, Arial, sans-serif",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#E02B22"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: dark ? "#334155" : "#E4E7EC",
      strokeDashArray: 4,
      padding: { left: 4, right: 8 },
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        borderRadiusApplication: "end",
        columnWidth: "48%",
      },
    },
    states: {
      hover: { filter: { type: "darken", value: 0.08 } },
      active: { filter: { type: "none" } },
    },
    theme: { mode: dark ? "dark" : "light" },
    tooltip: { theme: dark ? "dark" : "light" },
    xaxis: {
      categories: data.map((item) => item.label),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: dark ? "#AEBACC" : "#667085" } },
    },
    yaxis: {
      forceNiceScale: true,
      min: 0,
      labels: {
        formatter: (value) => Math.round(value).toString(),
        style: { colors: [dark ? "#AEBACC" : "#667085"] },
      },
    },
  }), [data, dark]);

  return <Chart key={dark ? "dark" : "light"} options={options} series={series} type="bar" height="100%" width="100%" />;
}

/* eslint-disable react/no-unknown-property */
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardBox from "./DashboardBox";

function SalesChart() {
  console.log("data");
  const fakeData = [
    { label: "Jan 09", totalSales: 480, extrasSales: 20 },
    { label: "Jan 10", totalSales: 580, extrasSales: 100 },
    { label: "Jan 11", totalSales: 550, extrasSales: 150 },
    { label: "Jan 12", totalSales: 600, extrasSales: 50 },
    { label: "Jan 13", totalSales: 700, extrasSales: 150 },
    { label: "Jan 14", totalSales: 800, extrasSales: 150 },
    { label: "Jan 15", totalSales: 700, extrasSales: 200 },
    { label: "Jan 16", totalSales: 650, extrasSales: 200 },
    { label: "Jan 17", totalSales: 600, extrasSales: 300 },
    { label: "Jan 18", totalSales: 550, extrasSales: 100 },
    { label: "Jan 19", totalSales: 700, extrasSales: 100 },
    { label: "Jan 20", totalSales: 800, extrasSales: 200 },
    { label: "Jan 21", totalSales: 700, extrasSales: 100 },
    { label: "Jan 22", totalSales: 810, extrasSales: 50 },
    { label: "Jan 23", totalSales: 950, extrasSales: 250 },
    { label: "Jan 24", totalSales: 970, extrasSales: 100 },
    { label: "Jan 25", totalSales: 900, extrasSales: 200 },
    { label: "Jan 26", totalSales: 950, extrasSales: 300 },
    { label: "Jan 27", totalSales: 850, extrasSales: 200 },
    { label: "Jan 28", totalSales: 900, extrasSales: 100 },
    { label: "Jan 29", totalSales: 800, extrasSales: 300 },
    { label: "Jan 30", totalSales: 950, extrasSales: 200 },
    { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
    { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
    { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
    { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
    { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
    { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
    { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
  ];

  const isDarkMode = true;
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <div className="h-fit text-base bg-grey-100 col-span-4 py-10 flex items-center mx-auto w-full rounded-md border border-grey-200">
      <div className="bg-grey-100 rounded-lg w-full">
        <AreaChart
          width={1000}
          height={250}
          data={fakeData}
          className="w-full m-auto"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotalSales" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.totalSales.stroke}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={colors.totalSales.stroke}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorExtrasSales" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.extrasSales.stroke}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={colors.extrasSales.stroke}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" stroke={colors.text} />
          <YAxis stroke={colors.text} />
          <CartesianGrid strokeDasharray="3 3" stroke={colors.text} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fillOpacity={1}
            fill="url(#colorTotalSales)"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fillOpacity={1}
            fill="url(#colorExtrasSales)"
          />
        </AreaChart>
      </div>
      {/* Hack to change grid line colors */}
      <style jsx>{`
        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line {
          stroke: var(--color-grey-300);
        }
      `}</style>
    </div>
  );
}

export default SalesChart;

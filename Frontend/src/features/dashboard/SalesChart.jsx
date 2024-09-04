/* eslint-disable react/no-unknown-property */
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SalesChart({ bookings }) {
  const isDarkMode = true;
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        date: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        date: "#374151",
        background: "#fff",
      };

  return (
    <div className="h-fit text-base bg-grey-100 col-span-4 py-10 flex items-center mx-auto w-full rounded-md border border-grey-200 flex-col">
      <h1 className="text-xl font-semibold mb-4 text-grey-500">
        Sales Summary
      </h1>
      <div className="bg-grey-100 rounded-lg w-full">
        <AreaChart
          width={1000}
          height={250}
          data={bookings}
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
          <XAxis dataKey="date" stroke={colors.date} />
          <YAxis stroke={colors.date} />
          <CartesianGrid strokeDasharray="3 3" stroke={colors.date} />
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

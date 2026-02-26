"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const equityData = [
  { month: "Mar", value: 10000 },
  { month: "Apr", value: 10840 },
  { month: "May", value: 10420 },
  { month: "Jun", value: 11900 },
  { month: "Jul", value: 11200 },
  { month: "Aug", value: 13100 },
  { month: "Sep", value: 12600 },
  { month: "Oct", value: 14500 },
  { month: "Nov", value: 13800 },
  { month: "Dec", value: 15900 },
  { month: "Jan", value: 16400 },
  { month: "Feb", value: 18400 },
];

const formatYAxis = (v: number) => `₹${(v / 1000).toFixed(0)}k`;

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 border text-sm"
        style={{
          backgroundColor: "#18181B",
          borderColor: "#27272A",
          color: "#FAFAFA",
        }}
      >
        <p className="font-semibold">{label}</p>
        <p style={{ color: "#10B981" }}>
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function EquityCurveChart() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-4">
        <div>
          <span className="text-xs" style={{ color: "#71717A" }}>
            Starting Value
          </span>
          <div className="text-base font-semibold text-white">₹10,000</div>
        </div>
        <div className="ml-auto text-right">
          <span className="text-xs" style={{ color: "#71717A" }}>
            Current Value
          </span>
          <div className="text-base font-semibold" style={{ color: "#10B981" }}>
            ₹18,400{" "}
            <span className="text-sm font-normal text-emerald-400">
              (+84%)
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={equityData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272A"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#71717A", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: "#71717A", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10B981"
            strokeWidth={2.5}
            fill="url(#equityGrad)"
            dot={false}
            activeDot={{ r: 5, fill: "#10B981", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

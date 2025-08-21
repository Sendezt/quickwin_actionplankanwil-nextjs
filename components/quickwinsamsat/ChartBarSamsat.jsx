"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function ChartBarSamsat({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-2xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="loket"
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
            formatter={(v) => [`${v}%`, "Nilai"]}
          />
          <Bar
            dataKey="nilai"
            fill="url(#colorBar)"
            radius={[6, 6, 0, 0]} // rounded top
          >
            <LabelList
              dataKey="nilai"
              position="top"
              formatter={(v) => `${v}%`}
              style={{ fontSize: "10px", fill: "#374151" }} // kecilkan angka
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

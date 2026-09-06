import React, { useEffect, useState } from "react";
import { BarChart3, Clock, Flame, Mic } from "lucide-react";

const Stats = ({dashboard}) => {
  const stats = [
    {
      icon: <Mic />,
      title: "Sessions",
      value: dashboard.stats.sessions,
      bg: "bg-indigo-500",
    },
    {
      icon: <BarChart3 />,
      title: "Avg Score",
      value: dashboard.stats.averageScore,
      bg: "bg-cyan-500",
    },
    {
      icon: <Flame />,
      title: "Streak",
      value: `${dashboard.stats.streak} days`,
      bg: "bg-orange-500",
    },
    {
      icon: <Clock />,
      title: "Practice Time",
      value: `${dashboard.stats.practiceMinutes}m`,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl shadow"
        >
          {/* ICON */}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-xl text-white ${s.bg}`}
          >
            {s.icon}
          </div>

          {/* VALUE */}
          <h3 className="text-2xl font-bold mt-4">
            {s.value}
          </h3>

          {/* TITLE */}
          <p className="text-gray-500 text-sm">
            {s.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
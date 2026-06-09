import { Target, Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function WeeklyGoal() {
  const total = 7;
  const finalProgress = 4;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(finalProgress), 200);
  }, []);

  const percentage = (progress / total) * 100;

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-white p-5 md:p-5 rounded-2xl shadow-sm w-full">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Target className="text-indigo-500" size={20} />
        <h3 className="font-semibold text-lg">Weekly Goal</h3>
      </div>

      {/* Circular Chart */}
      <div className="flex justify-center mb-1 ">
        <div className="relative w-26 h-28 md:w-32 md:h-32">
          
          <svg viewBox="0 0 160 160">
            {/* Background */}
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="80"
              cy="80"
            />

            {/* Gradient */}
            <defs>
              <linearGradient id="goalGradient">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Progress */}
            <circle
              stroke="url(#goalGradient)"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx="80"
              cy="80"
              style={{
                transition: "stroke-dashoffset 0.8s ease",
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold">
              {progress}/{total}
            </span>
            <span className="text-gray-500 text-sm">
              sessions
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Bars */}
      <div className="space-y-1">
        {days.map((day, i) => {
          const done = i < progress;

          return (
            <div key={day} className="flex items-center gap-3">
              
              {/* Day label */}
              <span className="w-10 text-sm text-gray-500">
                {day}
              </span>

              {/* Bar */}
              <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    done
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 w-full"
                      : "w-0"
                  } transition-all duration-700`}
                />
              </div>

              {/* Status Icon */}
              {done ? (
                <div className="w-4 h-4 flex items-center justify-center rounded-full border-2 border-green-500">
                  <Check size={12} className="text-green-500" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
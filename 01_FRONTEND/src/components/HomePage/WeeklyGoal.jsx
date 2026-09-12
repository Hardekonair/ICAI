import { Target, Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function WeeklyGoal({ goal }) {

  // -----------------------------------------
  // TODAY'S GOAL
  // -----------------------------------------

  const total =
    goal?.target ?? 5;

  const finalProgress =
    goal?.completed ?? 0;


  // -----------------------------------------
  // EACH DAY'S SESSION COUNT
  //
  // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  // -----------------------------------------

  const dailySessions =
    goal?.dailySessions ??
    [0, 0, 0, 0, 0, 0, 0];


  // -----------------------------------------
  // Animated today's progress
  // -----------------------------------------

  const [progress, setProgress] =
    useState(0);


  useEffect(() => {

    const timer =
      setTimeout(() => {

        setProgress(
          finalProgress
        );

      }, 200);


    return () =>
      clearTimeout(timer);

  }, [finalProgress]);


  // -----------------------------------------
  // TODAY'S CIRCLE PERCENTAGE
  // -----------------------------------------

  const percentage =
    Math.min(
      (progress / total) * 100,
      100
    );


  // -----------------------------------------
  // SVG CIRCLE
  // -----------------------------------------

  const radius = 70;

  const stroke = 10;

  const normalizedRadius =
    radius -
    stroke * 0.5;

  const circumference =
    normalizedRadius *
    2 *
    Math.PI;


  const strokeDashoffset =
    circumference -
    (percentage / 100) *
      circumference;


  // -----------------------------------------
  // DAYS
  // -----------------------------------------

  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];


  // JS:
  // Sunday = 0
  // Monday = 1
  //
  // Convert:
  // Monday = 0
  // Tuesday = 1
  // ...
  // Sunday = 6

  const todayIndex =
    (new Date().getDay() + 6) %
    7;


  return (

    <div className="w-full rounded-2xl bg-white p-5 shadow-sm">


      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className=" flex items-center gap-2">

        <Target
          className="text-indigo-500"
          size={20}
        />

        <h3 className="text-lg font-semibold">
          Daily Goal
        </h3>

      </div>


      {/* ================================= */}
      {/* CIRCULAR PROGRESS */}
      {/* ================================= */}

      <div className=" flex justify-center">

        <div className="relative h-28 w-28 md:h-32 md:w-32">

          <svg
            viewBox="0 0 160 160"
            className="h-full w-full"
          >

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

              <linearGradient
                id="goalGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >

                <stop
                  offset="0%"
                  stopColor="#6366f1"
                />

                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                />

              </linearGradient>

            </defs>


            {/* Progress */}

            <circle
              stroke="url(#goalGradient)"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={
                circumference
              }
              strokeDashoffset={
                strokeDashoffset
              }
              r={normalizedRadius}
              cx="80"
              cy="80"
              style={{
                transition:
                  "stroke-dashoffset 0.8s ease",
                transform:
                  "rotate(-90deg)",
                transformOrigin:
                  "50% 50%",
              }}
            />

          </svg>


          {/* Center text */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-2xl font-bold md:text-3xl">
              {progress}/{total}
            </span>

            <span className="text-sm text-gray-500">
              sessions
            </span>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* DAILY BREAKDOWN */}
      {/* ================================= */}

      <div className="space-y-2">

        {days.map((day, i) => {

          // Number of sessions
          // done on THIS day

          const daySessions =
            dailySessions[i] ?? 0;


          // Bar percentage
          //
          // 5 sessions = 100%
          // 2 sessions = 40%
          // 6 sessions = 100%

          const dayPercentage =
            Math.min(
              (daySessions / total) *
                100,
              100
            );


          const done =
            daySessions > 0;


          const isToday =
            i === todayIndex;


          return (

            <div
              key={day}
              className="flex items-center gap-3"
            >

              {/* ------------------------- */}
              {/* DAY */}
              {/* ------------------------- */}

              <span
                className={`w-10 text-sm ${
                  isToday
                    ? "font-semibold text-indigo-500"
                    : "text-gray-500"
                }`}
              >
                {day}
              </span>


              {/* ------------------------- */}
              {/* PROGRESS BAR */}
              {/* ------------------------- */}

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-700"
                  style={{
                    width:
                      `${dayPercentage}%`,
                  }}
                />

              </div>


              {/* ------------------------- */}
              {/* STATUS */}
              {/* ------------------------- */}

              {done ? (

                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">

                  <Check
                    size={12}
                    className="text-green-500"
                  />

                </div>

              ) : (

                <div className="h-5 w-5 rounded-full border-2 border-gray-300" />

              )}

            </div>

          );

        })}

      </div>

    </div>

  );
}
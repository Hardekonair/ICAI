import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ dashboard }) => {

  const streak = dashboard?.stats?.streak ?? 0;
  const sessions = dashboard?.stats?.sessions ?? 0;

  return (
    <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-5 text-white shadow-lg sm:p-7 md:flex-row md:items-center md:p-9">

      <div>

        <p className="text-sm">
          🔥 {streak}-day streak
        </p>

        <h2 className="text-2xl font-bold">
          Good morning, {dashboard?.user?.name ?? "there"}
        </h2>

        <p className="text-sm opacity-90">
          You've completed {sessions} sessions this week. Keep it up!
        </p>

      </div>

      <Link
        className="shrink-0 rounded-full bg-white px-5 py-2 text-center font-semibold text-indigo-600 shadow"
        to="/questions"
      >
        ▶ Start Practicing
      </Link>

    </div>
  );
};

export default Hero;

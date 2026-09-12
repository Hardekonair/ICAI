import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ dashboard }) => {

  const streak = dashboard?.stats?.streak ?? 0;
  const sessions = dashboard?.stats?.sessions ?? 0;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white p-9 rounded-3xl flex justify-between items-center shadow-lg">

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
        className="bg-white text-indigo-600 px-5 py-2 rounded-full font-semibold shadow"
        to="/questions"
      >
        ▶ Start Practicing
      </Link>

    </div>
  );
};

export default Hero;
import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const RecentSessions = ({ sessions }) => {

  const navigate=useNavigate();

  // Format date → 13 Jul 2026
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format time → 07:01 AM
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format duration
  const formatDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
      return `${minutes}m`;
    }

    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full">

      {/* Header */}
      <h3 className="font-semibold text-lg mb-4">
        Recent Sessions
      </h3>

      {/* Scroll */}
      <div className="max-h-[280px] overflow-y-auto no-scrollbar pr-2">

        {/* No sessions */}
        {!sessions || sessions.length === 0 ? (

          <p className="text-sm text-gray-500 py-4">
            No interview sessions yet.
          </p>

        ) : (

          sessions.map((s) => (

            <div
              key={s._id}
              className="flex items-center justify-between py-3 border-b last:border-none"
            >

              {/* Left content */}
              <div className="flex flex-col min-w-0">

                {/* Question */}
                <p className="text-sm font-medium truncate">
                  {s.question.title}
                </p>

                {/* Session information */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">

                  {/* Type */}
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-md">
                    {s.question.type}
                  </span>

                  {/* Date */}
                  <span>
                    {formatDate(s.createdAt)}
                  </span>

                  {/* Time */}
                  <span>
                    {formatTime(s.createdAt)}
                  </span>

                  {/* Duration */}
                  <span>
                    {formatDuration(s.duration)}
                  </span>

                </div>

              </div>

              {/* Arrow button */}
              <button
                onClick={() => navigate(`/review/${s._id}`)}
                className="p-2 rounded-lg hover:bg-gray-100 transition ml-3"
              >
                <ArrowRight
                  size={18}
                  className="text-indigo-600"
                />
              </button>

            </div>

          ))
        )}

      </div>
    </div>
  );
};

export default RecentSessions;
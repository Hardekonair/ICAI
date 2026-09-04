const ScoreCard = ({ score = 0 }) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#3b82f6";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const getLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Improvement";
    return "Keep Practicing";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-300 shadow-sm p-5 flex flex-col justify-start">

      {/* Header */}
      <h3 className="text-lg font-semibold text-slate-800 text-center">
        Overall Score
      </h3>

      {/* Gauge */}
      <div className="flex justify-center mt-2">

        <div className="relative">

          <svg width="120" height="120">

            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={getColor()}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-4xl font-bold text-slate-900">
              {score}
            </span>

            <span className="text-xs text-slate-500">
              /100
            </span>

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="mt-3 text-center">

        <span
          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
            ${
              score >= 80
                ? "bg-green-100 text-green-700"
                : score >= 60
                ? "bg-blue-100 text-blue-700"
                : score >= 40
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {getLabel()}
        </span>

      </div>

    </div>
  );
};

export default ScoreCard;
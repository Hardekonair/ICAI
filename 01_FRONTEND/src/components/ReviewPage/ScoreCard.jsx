const ScoreCard = ({ score = 0 }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">

      <h3 className="text-center text-2xl font-semibold">
        Overall Score
      </h3>

      <div className="relative flex justify-center mt-8">

        <svg width="220" height="220">

          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="14"
            fill="none"
          />

          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#ef4444"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 110 110)"
          />

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <h2 className="text-6xl font-bold">
            {score}
          </h2>

          <span className="text-slate-500">
            /100
          </span>

        </div>
      </div>

      <p className="text-center text-slate-500 mt-3 text-xl">
        Keep practicing — you're improving!
      </p>

    </div>
  );
};

export default ScoreCard;
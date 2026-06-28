const ProgressBar = ({ score }) => {
  let color = "bg-red-500";

  if (score >= 70) {
    color = "bg-green-500";
  } else if (score >= 50) {
    color = "bg-yellow-500";
  }

  return (
    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
      <div
        className={`${color} h-full rounded-full transition-all duration-500`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
};

const DimensionCard = ({
  title,
  score,
  description,
}) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5">

      <div className="flex justify-between items-center mb-3">

        <h3 className="text-xl font-semibold text-slate-800">
          {title}
        </h3>

        <span className="font-bold text-xl text-slate-900">
          {score}/100
        </span>

      </div>

      <ProgressBar score={score} />

      <p className="mt-4 text-slate-500 leading-7">
        {description}
      </p>

    </div>
  );
};

const DimensionBreakdown = ({
  dimensions = [],
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Dimension Breakdown
      </h2>

      <div className="space-y-5">

        {dimensions.map((item) => (
          <DimensionCard
            key={item.title}
            title={item.title}
            score={item.score}
            description={item.description}
          />
        ))}

      </div>

    </div>
  );
};

export default DimensionBreakdown;
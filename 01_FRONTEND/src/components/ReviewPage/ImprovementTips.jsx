import { AlertCircle } from "lucide-react";

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        styles[priority] || styles.Medium
      }`}
    >
      {priority} Priority
    </span>
  );
};

const ImprovementTips = ({ tips = [] }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

      <div className="flex items-center gap-3 mb-8">
        <AlertCircle className="text-orange-500" size={26} />

        <h2 className="text-3xl font-bold text-slate-900">
          Improvement Tips
        </h2>
      </div>

      <div className="space-y-5">

        {tips.map((tip, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl p-5"
          >
            <div className="flex items-start gap-4">

              {/* Number */}
              <div className="min-w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="font-semibold text-lg text-slate-800">
                    {tip.title}
                  </h3>

                  <PriorityBadge priority={tip.priority} />

                </div>

                <p className="text-slate-500 leading-7">
                  {tip.description}
                </p>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ImprovementTips;
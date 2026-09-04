import {
  MessageSquareText,
  Activity,
  FileText,
  Target,
  Mic,
  Code2,
  BarChart3,
} from "lucide-react";

const iconMap = {
  Clarity: MessageSquareText,
  Confidence: Activity,
  Structure: FileText,
  Relevance: Target,
  Fluency: Mic,
  "Technical Accuracy": Code2,
};

const getColor = (score) => {
  if (score >= 70) {
    return {
      bar: "bg-emerald-500",
      text: "text-emerald-600",
      badge: "bg-emerald-50 text-emerald-700",
    };
  }

  if (score >= 40) {
    return {
      bar: "bg-yellow-500",
      text: "text-yellow-600",
      badge: "bg-yellow-50 text-yellow-700",
    };
  }

  return {
    bar: "bg-red-500",
    text: "text-red-600",
    badge: "bg-red-50 text-red-700",
  };
};

const DimensionRow = ({ title, score }) => {
  const Icon = iconMap[title] || Target;
  const color = getColor(score);

  return (
    <div className="grid grid-cols-[200px_1fr_30px] items-center gap-5">

      {/* Left Section */}

      <div className="flex items-center gap-3 min-w-0">

        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">

          <Icon
            size={18}
            className="text-indigo-600"
          />

        </div>

        <span className="font-semibold text-slate-800 truncate">
          {title}
        </span>

      </div>

      {/* Progress */}

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

        <div
          className={`${color.bar} h-full rounded-full transition-all duration-700`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      {/* Score */}

      <div
        className={`text-right font-bold text-xl ${color.text}`}
      >
        {score}
      </div>

    </div>
  );
};

const DimensionSummary = ({
  dimensions = [],
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 h-full">

      {/* Header */}

      <div className="flex items-center justify-between mb-9">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            COMPETENCY SCORES
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            AI evaluation across interview competencies
          </p>

        </div>

        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">

          <BarChart3
            className="text-indigo-600"
            size={22}
          />

        </div>

      </div>

      {/* Body */}

      <div className="space-y-4">

        {dimensions.map((dimension) => (

          <DimensionRow
            key={dimension.title}
            title={dimension.title}
            score={dimension.score}
          />

        ))}

      </div>

      {/* Legend */}

<div className="mt-4 pt-6 border-t border-slate-200">

  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
    Score Legend
  </h4>

  <div className="grid grid-cols-3 gap-4">

    {/* Needs Improvement */}

    <div className="flex items-center gap-3 rounded-2xl bg-red-50 border border-red-100 px-4 py-3">

      <div className="w-3 h-3 rounded-full bg-red-500" />

      <div>
        <p className="font-semibold text-red-600">
          0 – 49
        </p>
        <p className="text-xs text-slate-500">
          Needs Improvement
        </p>
      </div>

    </div>

    {/* Average */}

    <div className="flex items-center gap-3 rounded-2xl bg-yellow-50 border border-yellow-100 px-4 py-3">

      <div className="w-3 h-3 rounded-full bg-yellow-500" />

      <div>
        <p className="font-semibold text-yellow-600">
          50 – 74
        </p>
        <p className="text-xs text-slate-500">
          Average
        </p>
      </div>

    </div>

    {/* Excellent */}

    <div className="flex items-center gap-3 rounded-2xl bg-green-50 border border-green-100 px-4 py-3">

      <div className="w-3 h-3 rounded-full bg-green-500" />

      <div>
        <p className="font-semibold text-green-600">
          75 – 100
        </p>
        <p className="text-xs text-slate-500">
          Excellent
        </p>
      </div>

    </div>

  </div>

</div>

    </div>
  );
};

export default DimensionSummary;
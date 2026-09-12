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
    };
  }

  if (score >= 40) {
    return {
      bar: "bg-yellow-500",
      text: "text-yellow-600",
    };
  }

  return {
    bar: "bg-red-500",
    text: "text-red-600",
  };
};

const DimensionRow = ({ title, score }) => {
  const Icon = iconMap[title] || Target;
  const color = getColor(score);

  return (
    <div className="grid grid-cols-[175px_1fr_35px] items-center gap-4">

      {/* Dimension */}
      <div className="flex items-center gap-2.5 min-w-0">

        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <Icon
            size={17}
            className="text-indigo-600"
          />
        </div>

        <span className="text-sm font-semibold text-slate-700 truncate">
          {title}
        </span>

      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`${color.bar} h-full rounded-full transition-all duration-700`}
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>

      {/* Score */}
      <span
        className={`text-right text-lg font-bold ${color.text}`}
      >
        {score}
      </span>

    </div>
  );
};

const DimensionSummary = ({ dimensions = [] }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-[420px]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Competency Scores
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            AI evaluation across interview competencies
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <BarChart3
            size={19}
            className="text-indigo-600"
          />
        </div>

      </div>

      {/* Dimensions */}
      <div className="space-y-4">

        {dimensions.map((dimension) => (
          <DimensionRow
            key={dimension.title}
            title={dimension.title}
            score={dimension.score}
          />
        ))}

      </div>

    </div>
  );
};

export default DimensionSummary;
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Code2,
  FileText,
  Lightbulb,
  MessageCircle,
  Mic,
  Quote,
  Target,
} from "lucide-react";

/* -------------------------------- */
/* Progress Bar                     */
/* -------------------------------- */

const ProgressBar = ({ score }) => {
  const safeScore = Math.min(Math.max(score || 0, 0), 100);

  let color = "bg-red-500";

  if (safeScore >= 75) {
    color = "bg-emerald-500";
  } else if (safeScore >= 50) {
    color = "bg-amber-500";
  }

  return (
    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
      <div
        className={`${color} h-full rounded-full transition-all duration-700`}
        style={{ width: `${safeScore}%` }}
      />
    </div>
  );
};

/* -------------------------------- */
/* Icon Mapping                     */
/* -------------------------------- */

const getIcon = (title) => {
  switch (title?.toLowerCase()) {
    case "clarity":
      return <MessageCircle className="text-sky-600" size={18} />;

    case "confidence":
      return <Activity className="text-violet-600" size={18} />;

    case "fluency":
      return <Mic className="text-emerald-600" size={18} />;

    case "relevance":
      return <Target className="text-red-500" size={18} />;

    case "structure":
      return <FileText className="text-orange-500" size={18} />;

    case "technical accuracy":
      return <Code2 className="text-cyan-600" size={18} />;

    default:
      return <MessageCircle className="text-indigo-600" size={18} />;
  }
};

/* -------------------------------- */
/* Score Color                      */
/* -------------------------------- */

const getScoreColor = (score) => {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-500";

  return "text-red-500";
};

/* -------------------------------- */
/* Detail Row                       */
/* -------------------------------- */

const DetailRow = ({
  icon,
  title,
  value,
  iconColor,
}) => {
  return (
    <div className="flex gap-3">

      {/* Icon */}
      <div className="mt-0.5 shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0">

        <h4
          className={`text-sm font-semibold ${iconColor}`}
        >
          {title}
        </h4>

        <p className="text-sm text-slate-600 leading-6 mt-0.5">
          {value || "Not available."}
        </p>

      </div>

    </div>
  );
};

/* -------------------------------- */
/* Expanded Details                 */
/* -------------------------------- */

const ExpandedSection = ({
  strength,
  weakness,
  evidence,
  improvement,
}) => {
  return (
    <div className="border-t border-slate-200 bg-slate-50/70 px-5 py-4">

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">

        {/* Strength */}
        <DetailRow
          title="Strength"
          value={strength}
          icon={
            <BadgeCheck
              className="text-emerald-500"
              size={18}
            />
          }
          iconColor="text-emerald-600"
        />

        {/* Weakness */}
        <DetailRow
          title="Weakness"
          value={weakness}
          icon={
            <AlertTriangle
              className="text-red-500"
              size={18}
            />
          }
          iconColor="text-red-600"
        />

        {/* Evidence */}
        <DetailRow
          title="Evidence"
          value={evidence}
          icon={
            <Quote
              className="text-blue-500"
              size={18}
            />
          }
          iconColor="text-blue-600"
        />

        {/* Improvement */}
        <DetailRow
          title="Improvement"
          value={improvement}
          icon={
            <Lightbulb
              className="text-amber-500"
              size={18}
            />
          }
          iconColor="text-amber-600"
        />

      </div>

    </div>
  );
};

/* -------------------------------- */
/* Dimension Item                   */
/* -------------------------------- */

const DimensionItem = ({
  title,
  score,
  strength,
  weakness,
  evidence,
  improvement,
}) => {
  const [expanded, setExpanded] = useState(false);

  const safeScore = Math.min(
    Math.max(score || 0, 0),
    100
  );

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        overflow-hidden
        transition-all
        duration-200
        hover:border-slate-300
        hover:shadow-sm
      "
    >

      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="
          w-full
          px-4
          py-3.5
          text-left
          transition
          hover:bg-slate-50/70
        "
      >

        <div className="flex items-center justify-between gap-5">

          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">

            {/* Icon */}
            <div
              className="
                w-9
                h-9
                rounded-xl
                bg-slate-50
                border
                border-slate-100
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              {getIcon(title)}
            </div>

            {/* Title */}
            <div className="min-w-0">

              <h3 className="text-sm font-semibold text-slate-800 truncate">
                {title}
              </h3>

              <p className="text-[11px] text-slate-400 mt-0.5">
                AI competency score
              </p>

            </div>

          </div>

          {/* Right */}
          <div className="flex items-center gap-3 shrink-0">

            <div className="text-right">

              <span
                className={`text-xl font-bold ${getScoreColor(
                  safeScore
                )}`}
              >
                {safeScore}
              </span>

              <span className="text-xs text-slate-400 ml-0.5">
                /100
              </span>

            </div>

            <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center">

              {expanded ? (
                <ChevronUp
                  size={17}
                  className="text-slate-400"
                />
              ) : (
                <ChevronDown
                  size={17}
                  className="text-slate-400"
                />
              )}

            </div>

          </div>

        </div>

        {/* Progress */}
        <div className="mt-3">
          <ProgressBar score={safeScore} />
        </div>

      </button>

      {/* Expanded Details */}
      {expanded && (
        <ExpandedSection
          strength={strength}
          weakness={weakness}
          evidence={evidence}
          improvement={improvement}
        />
      )}

    </div>
  );
};

/* -------------------------------- */
/* Main Component                   */
/* -------------------------------- */

const DimensionBreakdown = ({
  dimensions = [],
}) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-6
      "
    >

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Performance Breakdown
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Detailed AI evaluation across interview competencies
          </p>

        </div>

      </div>

      {/* Dimensions */}
      <div className="space-y-2.5">

        {dimensions.map((item) => (
          <DimensionItem
            key={item.title}
            title={item.title}
            score={item.score}
            strength={item.strength}
            weakness={item.weakness}
            evidence={item.evidence}
            improvement={item.improvement}
          />
        ))}

      </div>

    </div>
  );
};

export default DimensionBreakdown;
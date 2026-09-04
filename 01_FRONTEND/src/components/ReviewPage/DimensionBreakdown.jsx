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
  let color = "bg-red-500";

  if (score >= 75) {
    color = "bg-emerald-500";
  } else if (score >= 50) {
    color = "bg-amber-500";
  }

  return (
    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">

      <div
        className={`${color} h-full rounded-full transition-all duration-700`}
        style={{ width: `${score}%` }}
      />

    </div>
  );
};

/* -------------------------------- */
/* Icon Mapping                     */
/* -------------------------------- */

const getIcon = (title) => {

  switch (title.toLowerCase()) {

    case "clarity":
      return (
        <MessageCircle
          className="text-sky-600"
          size={20}
        />
      );

    case "confidence":
      return (
        <Activity
          className="text-violet-600"
          size={20}
        />
      );

    case "fluency":
      return (
        <Mic
          className="text-emerald-600"
          size={20}
        />
      );

    case "relevance":
      return (
        <Target
          className="text-red-500"
          size={20}
        />
      );

    case "structure":
      return (
        <FileText
          className="text-orange-500"
          size={20}
        />
      );

    case "technical accuracy":
      return (
        <Code2
          className="text-cyan-600"
          size={20}
        />
      );

    default:
      return (
        <MessageCircle
          className="text-indigo-600"
          size={20}
        />
      );
  }

};

/* -------------------------------- */
/* Score Color                      */
/* -------------------------------- */

const getScoreColor = (score) => {

  if (score >= 75)
    return "text-emerald-600";

  if (score >= 50)
    return "text-amber-500";

  return "text-red-500";

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

  const [expanded, setExpanded] =
    useState(false);

  return (

    <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">

      {/* Header */}

      <button

        onClick={() =>
          setExpanded(!expanded)
        }

        className="
            w-full
            p-5
            bg-white
            hover:bg-slate-50
            transition
        "

      >

        <div className="flex justify-between items-start">

          {/* Left */}

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">

              {getIcon(title)}

            </div>

            <div className="text-left">

              <h3 className="text-xl font-semibold text-slate-800">

                {title}

              </h3>

              <p className="text-sm text-slate-500 mt-1">

                AI competency score

              </p>

            </div>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            <div className="text-right">

              <h3
                className={`text-2xl font-bold ${getScoreColor(score)}`}
              >

                {score}

                <span className="text-base text-slate-400">

                  /100

                </span>

              </h3>

            </div>

            {expanded ? (

              <ChevronUp
                className="text-slate-400"
                size={22}
              />

            ) : (

              <ChevronDown
                className="text-slate-400"
                size={22}
              />

            )}

          </div>

        </div>

        {/* Progress */}

        <div className="mt-5">

          <ProgressBar score={score} />

        </div>

      </button>

      {/* DETAILS WILL COME IN PART 2 */}
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
/* Detail Row                       */
/* -------------------------------- */

const DetailRow = ({
  icon,
  title,
  value,
  iconColor,
}) => {
  return (
    <div className="flex gap-4">

      <div className="mt-1">

        {icon}

      </div>

      <div>

        <h4
          className={`font-semibold ${iconColor}`}
        >
          {title}
        </h4>

        <p className="text-slate-600 leading-7 mt-1">
          {value}
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

    <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50 animate-in fade-in duration-300">

      <div className="space-y-6 mt-5">

        <DetailRow
          title="Strength"
          value={strength}
          icon={
            <BadgeCheck
              className="text-emerald-500"
              size={20}
            />
          }
          iconColor="text-emerald-600"
        />

        <DetailRow
          title="Weakness"
          value={weakness}
          icon={
            <AlertTriangle
              className="text-red-500"
              size={20}
            />
          }
          iconColor="text-red-600"
        />

        <DetailRow
          title="Evidence"
          value={evidence}
          icon={
            <Quote
              className="text-blue-500"
              size={20}
            />
          }
          iconColor="text-blue-600"
        />

        <DetailRow
          title="Improvement"
          value={improvement}
          icon={
            <Lightbulb
              className="text-amber-500"
              size={20}
            />
          }
          iconColor="text-amber-600"
        />

      </div>

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

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            Performance Breakdown
          </h2>

          <p className="text-slate-500 mt-2">
            AI evaluation across interview competencies
          </p>

        </div>

      </div>

      {/* Dimensions */}

      <div className="space-y-3">

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
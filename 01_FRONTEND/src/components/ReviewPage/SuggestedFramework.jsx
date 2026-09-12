import { Lightbulb } from "lucide-react";

const SuggestedFramework = ({ framework }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <Lightbulb
            size={19}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Suggested Answer Framework
          </h2>

          <p className="text-xs text-slate-500 mt-0.5">
            A recommended structure for answering this question
          </p>
        </div>

      </div>

      {/* Framework */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50/80 to-cyan-50/80 border border-indigo-100 p-5">

        {/* Framework Title */}
        <h3 className="text-base font-bold text-slate-900 mb-2">
          {framework?.title || "Recommended Framework"}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-700 leading-6 whitespace-pre-line">
          {framework?.description || "No framework available."}
        </p>

      </div>

      {/* Tip */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 px-4 py-3">

        <Lightbulb
          size={17}
          className="text-indigo-600 mt-0.5 shrink-0"
        />

        <p className="text-xs text-indigo-700 leading-5">
          Use this structure as a guide, then personalize it with your
          own experiences and achievements.
        </p>

      </div>

    </div>
  );
};

export default SuggestedFramework;
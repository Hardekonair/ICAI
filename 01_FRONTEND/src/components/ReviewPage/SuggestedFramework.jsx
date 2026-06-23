import { Lightbulb } from "lucide-react";

const SuggestedFramework = ({ framework }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb
          size={28}
          className="text-indigo-600"
        />

        <h2 className="text-3xl font-bold text-slate-900">
          Suggested Answer Framework
        </h2>
      </div>

      {/* Framework Box */}
      <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 rounded-2xl p-8">

        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {framework?.title}
          </h3>

          <p className="text-slate-700 leading-9 text-lg whitespace-pre-line">
            {framework?.description}
          </p>
        </div>

      </div>

      {/* Tip */}
      <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100">

        <p className="text-indigo-700 font-medium">
          💡 Use this structure as a guide, then personalize it with
          your own experiences and achievements.
        </p>

      </div>

    </div>
  );
};

export default SuggestedFramework;
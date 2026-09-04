import { Clock3 } from "lucide-react";

const SpeechStatsCard = ({ stats = {} }) => {
  const {
    duration = "00:00",
    words = 0,
    sentences = 0,
    pace = 0,
    fillerWords = 0,
  } = stats;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">

        <Clock3
          size={18}
          className="text-indigo-500"
        />

        <h3 className="text-lg font-semibold text-slate-900">
          Speech Stats
        </h3>

      </div>

      {/* Stats */}
      <div >

        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-lg text-slate-500">
            Duration
          </span>

          <span className="font-semibold text-slate-900">
            {duration}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-lg text-slate-500">
            Words
          </span>

          <span className="font-semibold text-slate-900">
            {words}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-lg text-slate-500">
            Sentences
          </span>

          <span className="font-semibold text-slate-900">
            {sentences}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-lg text-slate-500">
            Pace
          </span>

          <span className="font-semibold text-slate-900">
            {pace} WPM
          </span>
        </div>

        <div className="flex items-center justify-between">

          <span className="text-lg text-slate-500">
            Fillers
          </span>

          <span
            className={`text-sm font-semibold px-2 py-1 rounded-full ${
              fillerWords === 0
                ? "bg-emerald-50 text-emerald-600"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            {fillerWords}
          </span>

        </div>

      </div>

    </div>
  );
};

export default SpeechStatsCard;
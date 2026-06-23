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
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Clock3 size={22} className="text-slate-400" />
        <h3 className="text-2xl font-semibold text-slate-800">
          Speech Stats
        </h3>
      </div>

      {/* Stats */}
      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-lg">
            Duration
          </span>

          <span className="font-semibold text-2xl text-slate-900">
            {duration}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-lg">
            Words spoken
          </span>

          <span className="font-semibold text-2xl text-slate-900">
            {words}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-lg">
            Sentences
          </span>

          <span className="font-semibold text-2xl text-slate-900">
            {sentences}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-lg">
            Pace
          </span>

          <span className="font-semibold text-2xl text-slate-900">
            {pace} wpm
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-lg">
            Filler words
          </span>

          <span
            className={`font-semibold text-2xl ${
              fillerWords === 0
                ? "text-emerald-500"
                : "text-orange-500"
            }`}
          >
            {fillerWords === 0
              ? "0 detected"
              : `${fillerWords} detected`}
          </span>
        </div>

      </div>
    </div>
  );
};

export default SpeechStatsCard;
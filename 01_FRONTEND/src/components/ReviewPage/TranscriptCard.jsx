const TranscriptCard = ({
  transcript,
  fillerWords,
  words,
  sentences,
  pace,
}) => {
  return (
    <div className="flex min-w-0 flex-col rounded-3xl bg-white p-4 shadow-sm min-h-[220px] lg:h-[260px]">

<div className="flex items-center gap-3 mb-3 shrink-0">

  <div className="w-1 h-6 rounded-full bg-indigo-600" />

  <h2 className="
    text-xl
    font-semibold
    tracking-tight
    text-slate-800
  ">
    Annotated Transcript
  </h2>

</div>

      {/* SCROLLABLE TRANSCRIPT */}
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden pr-3">

  <p className="text-xs leading-5 text-slate-700 break-words whitespace-pre-wrap">
    {transcript}
  </p>

</div>

<div className="pt-2  border-t border-slate-200 shrink-0 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">

  <span className="text-slate-500">
    <span className="font-semibold text-slate-800">
      {words}
    </span>{" "}
    words
  </span>

  <span className="text-slate-300">•</span>

  <span className="text-slate-500">
    <span className="font-semibold text-slate-800">
      {sentences}
    </span>{" "}
    sentences
  </span>

  <span className="text-slate-300">•</span>

  <span className="text-slate-500">
    <span className="font-semibold text-indigo-600">
      {pace} WPM
    </span>
  </span>

  <span className="text-slate-300">•</span>

  <span className="text-slate-500">
    <span className="font-semibold text-amber-600">
      {fillerWords}
    </span>{" "}
    fillers
  </span>

</div>

    </div>
  );
};

export default TranscriptCard;

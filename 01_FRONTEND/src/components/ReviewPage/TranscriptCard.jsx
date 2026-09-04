const TranscriptCard = ({
  transcript,
  fillerWords,
  words,
  sentences,
  pace,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col h-full">

      <h2 className="font-bold text-2xl mb-4">
        Annotated Transcript
      </h2>

      <div className="flex flex-wrap gap-3 mb-5">

        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          Filler word
        </span>

        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          Hedge word
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Strong word
        </span>

      </div>

      <div className="flex-1 overflow-y-auto">

        <p className="text-lg leading-9 text-slate-700">
          {transcript}
        </p>

      </div>

      <p className="pt-4 border-t border-slate-200">

        {words} words spoken across {sentences} sentence(s)
        at ~{pace} wpm. {fillerWords} filler words detected.

      </p>

    </div>
  );
};

export default TranscriptCard;
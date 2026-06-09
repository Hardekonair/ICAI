import { Video, Lock, Sparkles } from "lucide-react";

const questions = [
  {
    title: "Walk me through your resume",
    type: "Behavioral",
    level: "Easy",
    locked: false,
  },
  {
    title: "Where do you see yourself in 5 years?",
    type: "Career Goals",
    level: "Medium",
    locked: false,
  },
  {
    title: "Tell me about a time you failed",
    type: "Behavioral",
    level: "Medium",
    locked: false,
  },
  {
    title: "How do you handle conflict at work?",
    type: "Situational",
    level: "Hard",
    locked: true,
  },
  {
    title: "What motivates you?",
    type: "Motivational",
    level: "Easy",
    locked: true,
  },
  {
    title: "Describe your leadership style",
    type: "Leadership",
    level: "Hard",
    locked: true,
  },
];

export default function PracticeQuestions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm w-full overflow-hidden col-span-2">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-indigo-500">📘</span>
          <h3 className="font-semibold text-lg">Practice Questions</h3>
        </div>
        <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          500+ available
        </span>
      </div>

      {/* List */}
      <div>
        {questions.map((q, i) => (
          <div
            key={i}
            className={`group flex items-center justify-between px-5 py-4 border-b last:border-none ${
              q.locked ? "opacity-60" : ""
            }`}
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
                {q.locked ? <Lock size={16} /> : <Video size={16} />}
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-medium">{q.title}</p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{q.type}</span>
                  <span>•</span>

                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      q.level === "Easy"
                        ? "bg-green-100 text-green-600"
                        : q.level === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {q.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              {!q.locked ? (
                <button className="opacity-0 group-hover:opacity-100 transition bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">
                  ▶ Practice
                </button>
              ) : (
                <button className="text-indigo-500 text-sm bg-indigo-50 px-4 py-2 rounded-lg">
                  Upgrade
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t">
        <div className="border-2 border-dashed border-indigo-200 rounded-xl py-3 text-center text-indigo-600 text-sm flex items-center justify-center gap-2">
          <Sparkles size={16} />
          Unlock all 500+ questions with Pro
        </div>
      </div>
    </div>
  );
}
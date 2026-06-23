import { CheckCircle2, FileText, Play } from "lucide-react";

const ReviewHeader = ({ question }) => {
  return (
    <div className="bg-white border-b">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle2 size={16} />
              Analysis Complete
            </div>

            <h1 className="text-5xl font-bold mt-5 text-slate-900">
              Your AI Feedback
            </h1>

            <p className="text-slate-500 text-2xl mt-3">
              "{question?.title || 'Question not available'}"
            </p>

          </div>

          <div className="flex gap-4 mt-6 lg:mt-0">

            <button className="flex items-center gap-2 border border-slate-200 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 transition">

              <FileText size={18} />
              View Transcript

            </button>

            <button className="flex items-center gap-2 px-6 py-4 rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg">

              <Play size={18} />
              New Question

            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ReviewHeader;
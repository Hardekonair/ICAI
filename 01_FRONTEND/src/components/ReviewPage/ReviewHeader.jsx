import { CheckCircle2 } from "lucide-react";

const ReviewHeader = ({ question }) => {
  return (
    <div className="relative h-20 overflow-hidden border-b border-slate-200 bg-gradient-to-r from-white via-indigo-50/40 to-cyan-50/40">

      {/* Soft Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-0 h-36 w-36 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-10 left-0 h-36 w-36 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center gap-5">

        {/* Status */}
        <div className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
          <CheckCircle2 size={14} />
          Analysis Complete
        </div>

        {/* Title */}
        <h1 className="
          shrink-0
          text-2xl
          font-black
          tracking-tight
          bg-gradient-to-r
          from-slate-900
          via-indigo-700
          to-cyan-600
          bg-clip-text
          text-transparent
        ">
          AI Interview Report
        </h1>

        {/* Divider */}
        <div className="h-7 w-px bg-slate-200 shrink-0" />

        {/* Question */}
        <div className="min-w-0 flex items-center gap-2">

          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Question
          </span>

          <p className="truncate text-sm font-medium italic text-slate-700">
            "{question?.title || "Question not available"}"
          </p>

        </div>

      </div>
    </div>
  );
};

export default ReviewHeader;
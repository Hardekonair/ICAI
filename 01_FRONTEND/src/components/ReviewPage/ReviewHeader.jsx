import { CheckCircle2 } from "lucide-react";

const ReviewHeader = ({ question }) => {
  return (
    <div className="review-header relative min-h-20 overflow-hidden border-b border-slate-200 bg-gradient-to-r from-white via-indigo-50/40 to-cyan-50/40">

      {/* Soft Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-0 h-36 w-36 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-10 left-0 h-36 w-36 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-20 max-w-7xl items-center gap-3 px-4 sm:gap-5 sm:px-6">

        {/* Status */}
        <div className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
          <CheckCircle2 size={14} />
          Analysis Complete
        </div>

        {/* Title */}
        <h1 className="
          shrink-0
          text-lg
          sm:text-2xl
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
        <div className="hidden h-7 w-px shrink-0 bg-slate-200 sm:block" />

        {/* Question */}
        <div className="hidden min-w-0 items-center gap-2 sm:flex">

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

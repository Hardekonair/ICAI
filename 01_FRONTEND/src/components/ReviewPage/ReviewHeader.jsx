// import { CheckCircle2 } from "lucide-react";

// const ReviewHeader = ({ question }) => {
//   return (
//     <div className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/40 to-cyan-50/40 border-b border-slate-200">

//       {/* Decorative Background */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-indigo-200/20 blur-3xl" />
//         <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-cyan-200/20 blur-3xl" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 py-6">

//         {/* Status Badge */}
//         {/* <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
//           <CheckCircle2 size={15} />
//           Analysis Complete
//         </div> */}

//         {/* Heading */}
//         <h1 className="mt-1
//           text-4xl lg:text-4xl
//           font-black
//           tracking-tight
//           bg-gradient-to-r
//           from-slate-900
//           via-indigo-700
//           to-cyan-600
//           bg-clip-text
//           text-transparent">
//           AI Interview Report
//         </h1>

//         {/* Question */}
//         <div className="mt-5 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-5 py-4 shadow-sm">

//           <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
//             Interview Question
//           </p>

//           <p className="mt-2 text-lg lg:text-xl italic leading-relaxed text-slate-700">
//             "{question?.title || "Question not available"}"
//           </p>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default ReviewHeader;

import { CheckCircle2 } from "lucide-react";

const ReviewHeader = ({ question }) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-white via-indigo-50/40 to-cyan-50/40">

      {/* Soft Background Blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 right-0 h-36 w-36 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-10 left-0 h-36 w-36 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-4">

        {/* Status */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
          <CheckCircle2 size={14} />
          Analysis Complete
        </div>

        {/* Title */}
        <h1 className="mt-1
          text-4xl lg:text-4xl
          font-black
          tracking-tight
          bg-gradient-to-r
          from-slate-900
          via-indigo-700
          to-cyan-600
          bg-clip-text
          text-transparent">
          AI Interview Report
        </h1>

        {/* Question */}
        <div className="mt-3 flex flex-wrap items-start gap-2 text-sm md:text-base">

          <span className="font-semibold text-slate-500 whitespace-nowrap">
            Question:
          </span>

          <p className="text-slate-700 italic">
            "{question?.title || "Question not available"}"
          </p>

        </div>

      </div>
    </div>
  );
};

export default ReviewHeader;
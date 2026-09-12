import {
  RotateCcw,
  ArrowRight,
  Home,
  Save,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
  const navigate = useNavigate();

  // Practice the same question again
  const handlePracticeAgain = () => {
    navigate("/startRecording", { replace: true });
  };

  // Start another interview question
  const handleNewQuestion = () => {
    navigate("/questions", { replace: true });
  };

  // Go back to dashboard
  const handleDashboard = () => {
    navigate("/homepage", { replace: true });
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

      {/* Practice Same Question */}
      <button
        type="button"
        onClick={handlePracticeAgain}
        className="
          group
          bg-white
          border
          border-slate-200
          rounded-2xl
          px-4
          py-4
          flex
          items-center
          gap-3
          text-left
          transition-all
          duration-200
          hover:border-indigo-300
          hover:shadow-sm
        "
      >
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-slate-100
            flex
            items-center
            justify-center
            shrink-0
            transition
            group-hover:bg-indigo-50
          "
        >
          <RotateCcw
            size={19}
            className="
              text-slate-600
              group-hover:text-indigo-600
              transition-colors
            "
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900">
            Practice Same Question
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">
            Apply feedback and try again
          </p>
        </div>
      </button>


      {/* Try Another Question */}
      <button
        type="button"
        onClick={handleNewQuestion}
        className="
          group
          rounded-2xl
          px-4
          py-4
          flex
          items-center
          gap-3
          text-left
          text-white
          bg-gradient-to-r
          from-indigo-600
          to-cyan-500
          shadow-sm
          transition-all
          duration-200
          hover:shadow-md
          hover:-translate-y-0.5
        "
      >
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-white/15
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <ArrowRight size={19} />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold">
            Try Another Question
          </h3>

          <p className="text-xs text-white/75 mt-0.5">
            Continue your interview practice
          </p>
        </div>
      </button>


      {/* Saved Status */}
      <div
        className="
          rounded-2xl
          px-4
          py-4
          flex
          items-center
          gap-3
          bg-emerald-50
          border
          border-emerald-100
        "
      >
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-emerald-100
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Save
            size={19}
            className="text-emerald-600"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-emerald-700">
            Report Saved
          </h3>

          <p className="text-xs text-emerald-600/80 mt-0.5">
            Interview stored successfully
          </p>
        </div>
      </div>


      {/* Dashboard */}
      <button
        type="button"
        onClick={handleDashboard}
        className="
          group
          bg-white
          border
          border-slate-200
          rounded-2xl
          px-4
          py-4
          flex
          items-center
          gap-3
          text-left
          transition-all
          duration-200
          hover:border-indigo-300
          hover:shadow-sm
        "
      >
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-slate-100
            flex
            items-center
            justify-center
            shrink-0
            transition
            group-hover:bg-indigo-50
          "
        >
          <Home
            size={19}
            className="
              text-slate-600
              group-hover:text-indigo-600
              transition-colors
            "
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900">
            Dashboard
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">
            Return to your home page
          </p>
        </div>
      </button>

    </div>
  );
};

export default ActionButtons;
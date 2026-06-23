import { RotateCcw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
  const navigate = useNavigate();

  const handlePracticeAgain = () => {
    navigate(-1);
  };

  const handleNewQuestion = () => {
    navigate("/practice");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">

      {/* Practice Again */}

      <button
        onClick={handlePracticeAgain}
        className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-center gap-4 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          <RotateCcw size={22} />
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-lg text-slate-900">
            Practice Same Question
          </h3>

          <p className="text-slate-500 text-sm">
            Apply feedback and try again
          </p>
        </div>
      </button>

      {/* New Question */}

      <button
        onClick={handleNewQuestion}
        className="bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-3xl p-6 flex items-center justify-center gap-4 text-white shadow-lg hover:scale-[1.01] transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowRight size={22} />
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-lg">
            Try Another Question
          </h3>

          <p className="text-white/80 text-sm">
            Continue improving your interview skills
          </p>
        </div>
      </button>

    </div>
  );
};

export default ActionButtons;
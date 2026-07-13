import {
  RotateCcw,
  ArrowRight,
  Home,
  Save
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveInterview } from "../../services/interviewApi";

const ActionButtons = ({
        videoBlob,
        question,
        transcript,
        duration,
        speechStats,
        analysis
    }) => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePracticeAgain = () => {
    navigate(-1);
  };

  const handleNewQuestion = () => {
    navigate("/practice");
  };

  const handleSave = async () => {

      if (saved) return;

      try {

          setSaving(true);

          const formData = new FormData();

          formData.append(
              "video",
              videoBlob,
              "interview.webm"
          );

          formData.append(
              "question",
              JSON.stringify(question)
          );

          formData.append(
              "transcript",
              transcript
          );

          formData.append(
              "duration",
              duration
          );

          formData.append(
              "speechStats",
              JSON.stringify(speechStats)
          );

          formData.append(
              "analysis",
              JSON.stringify(analysis)
          );

          const response =
              await saveInterview(formData);

          console.log(response);

          setSaved(true);

          alert("Interview saved successfully!");

      } catch (error) {

          console.error(error);

          alert("Failed to save interview.");

      } finally {

          setSaving(false);

      }

  };

  const handleDashboard = () => {
      navigate("/dashboard");
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

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

      <button
        onClick={handleSave}
        disabled={saving || saved}
        className="
            bg-emerald-600
            rounded-3xl
            p-6
            flex
            items-center
            justify-center
            gap-4
            text-white
            shadow-lg
            hover:scale-[1.01]
            transition-all
            duration-300
            disabled:opacity-60
        "
    >
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">

            <Save size={22} />

        </div>

        <div className="text-left">

            <h3 className="font-semibold text-lg">

                {
                    saved
                        ? "Report Saved"
                        : saving
                        ? "Saving..."
                        : "Save Report"
                }

            </h3>

            <p className="text-white/80 text-sm">

                {
                    saved
                        ? "Interview stored successfully"
                        : "Upload and save this interview"
                }

            </p>

        </div>

    </button>

    <button
        onClick={handleDashboard}
        className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-6
            flex
            items-center
            justify-center
            gap-4
            hover:border-indigo-300
            hover:shadow-md
            transition-all
            duration-300
        "
    >
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Home size={22} />
        </div>

        <div className="text-left">
            <h3 className="font-semibold text-lg text-slate-900">
                Dashboard
            </h3>

            <p className="text-slate-500 text-sm">
                Return to your home page
            </p>
        </div>
    </button>

    </div>
  );
};

export default ActionButtons;
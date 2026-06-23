import React, { useState,useEffect, useMemo } from "react";
import { analyzeInterview } from "../../services/interviewApi";
import {
  AlertCircle,
  FileText,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { getInterviewDraft } from "../../utils/interviewStorage";
import {useNavigate} from "react-router-dom"

const AnalyzePage = () => {

  const [videoURL, setVideoURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const [question, setQuestion] = useState(null);
  const [duration,setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  // const transcript =
  //   "Hi my name is hardik and i am a student";

  useEffect(() => {
    let url;
    
    const load = async () => {

      const interview = await getInterviewDraft();
      console.log("Interview Draft:", interview);

      if (
        !interview?.session &&
        !interview?.recording
      ) {

        navigate("/practice");

        return;
      }


      // console.log("Interview:", interview);

      if(!interview?.recording)  return;

      if(interview.session){
        setQuestion(interview.session.question);
      }

      // console.log(interview.videoBlob);
      // console.log(videoURL);
      if(interview.recording){
        url = URL.createObjectURL(interview.recording.videoBlob);
        setVideoURL(url);

        setTranscript(interview.recording.transcript || "");
        setDuration(interview.recording.duration || 0);
      }

    };

    load();

    return ()=>{
      if(url)
        URL.revokeObjectURL(url);
    };

  },[]);

  const handleAnalyze = async () => {
    try {

      setLoading(true);

      const response =
        await analyzeInterview({
          question: question.title,
          transcript,
          duration
        });

      console.log("API RESPONSE", response);

      console.log(response);

      navigate("/review", {
        state: {
          question,
          transcript,
          analysis: response.analysis
        }
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const wordCount = useMemo(() => {
    return transcript.trim()
      ? transcript.trim().split(/\s+/).length
      : 0;
  }, [transcript]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;

    return `${mins
      .toString()
      .padStart(2,"0")}:${secs
      .toString()
      .padStart(2,"0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PAGE CONTAINER */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
            <FileText size={16} />
            Review Your Answer
          </span>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 tracking-tight">
            Confirm your transcript
          </h1>

          <p className="mt-3 text-sm text-slate-500 max-w-4xl">
            This is what our speech recognition captured.
            Review it, fix any errors, then submit for
            analysis.{" "}
            <span className="font-semibold text-slate-800">
              The AI will analyze ONLY this text.
            </span>
          </p>
        </div>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* VIDEO CARD */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            {/* <video
              controls
              className="w-full aspect-video object-cover"
            >
              <source
                src={videoURL}
                type="video/webm"
              />
            </video> */}
            {/* In previous the <source /> doesn't reload the video as it gets src="" at first load but the "src" updates it automatically */}
            {videoURL && (
              <video
                controls
                src={videoURL}
                className="w-full h-full aspect-video object-cover"
              />
            )}
          </div>

          {/* SESSION INFO */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Session Info
            </h3>

            <div className="mt-7 space-y-6">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Question
                </span>

                <span className="font-semibold text-slate-800 text-right">
                  {question?.title || "No Question Found"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Duration
                </span>

                <span className="font-semibold text-slate-800">
                  <span className="text-slate-400 font-normal">
                    {formatDuration(duration)}
                  </span>
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Words captured
                </span>

                <span className="font-bold text-slate-900">
                  {wordCount}
                </span>
              </div>
            </div>

            {/* WARNING */}
            <div className="mt-8 rounded-2xl bg-amber-50 border border-amber-100 p-4">
              <div className="flex gap-3">
                <AlertCircle
                  size={18}
                  className="text-amber-500 mt-0.5"
                />

                <p className="text-sm text-amber-700 leading-relaxed">
                  Speech recognition may miss words.
                  Edit the transcript below to ensure
                  accuracy before analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TRANSCRIPT CARD */}
        <div className="mt-8 bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText
                size={18}
                className="text-indigo-500"
              />

              <h3 className="font-semibold text-slate-800">
                Your Transcript
              </h3>
            </div>

            <span className="text-slate-400 text-sm">
              {wordCount} words
            </span>
          </div>

          <div className="mt-5 border-2 border-dashed border-slate-200 rounded-3xl p-6">
            <textarea
              value={transcript}
              onChange={(e) =>
                setTranscript(e.target.value)
              }
              placeholder="Type your answer here to get AI feedback..."
              className="
                w-full
                min-h-[220px]
                resize-none
                rounded-2xl
                border
                border-indigo-300
                px-5
                py-4
                text-lg
                outline-none
                focus:ring-4
                focus:ring-indigo-100
              "
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => {console.log({question,transcript, duration}); navigate("/startRecording");}}
            className="
              flex items-center gap-2
              px-6 py-3
              rounded-2xl
              border border-slate-200
              bg-white
              text-slate-700
              font-medium
              hover:bg-slate-50
              transition
            "
          >
            <RotateCcw size={18} />
            Re-record
          </button>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
              flex items-center gap-2
              px-8 py-4
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              via-blue-500
              to-cyan-500
              text-white
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              transition-all
            "
          >
            <Sparkles size={18} />
            {loading
              ? "Analyzing..."
              : "Analyze My Answer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;

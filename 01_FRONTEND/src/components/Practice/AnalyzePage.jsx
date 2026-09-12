import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import {
  AlertCircle,
  FileText,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import {
  analyzeInterview,
  saveInterview,
} from "../../services/interviewApi";

import {
  getInterviewDraft,
} from "../../utils/interviewStorage";

import {
  calculateSpeechStats,
} from "../../utils/speechStats";

import {
  useNavigate,
} from "react-router-dom";

import ShowLoading from "../ShowLoading";


const AnalyzePage = () => {

  /* -------------------------------- */
  /* State                            */
  /* -------------------------------- */

  const [videoURL, setVideoURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const [question, setQuestion] = useState(null);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  // Transcript validation error
  const [transcriptError, setTranscriptError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
  if (!loading) return;

  // ==============================
  // REFRESH / CLOSE TAB WARNING
  // ==============================
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  // ==============================
  // BROWSER BACK BUTTON WARNING
  // ==============================
  const handlePopState = () => {
    const leave = window.confirm(
      "Your interview analysis is still in progress. Are you sure you want to leave?"
    );

    if (!leave) {
      // Stay on the current page
      window.history.pushState(null, "", window.location.href);
    } else {
      // Allow the browser to go back
      window.removeEventListener("popstate", handlePopState);
      window.history.back();
    }
  };

  // Add an extra history entry so we can intercept Back
  window.history.pushState(null, "", window.location.href);

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.removeEventListener("popstate", handlePopState);
  };
}, [loading]);


  /* -------------------------------- */
  /* Load Interview Draft             */
  /* -------------------------------- */

  useEffect(() => {

    let url;

    const load = async () => {

      try {

        const interview = await getInterviewDraft();

        /* ---------------------------- */
        /* No interview found           */
        /* ---------------------------- */

        if (
          !interview?.session &&
          !interview?.recording
        ) {

          navigate("/practice", {
            replace: true,
          });

          return;
        }


        /* ---------------------------- */
        /* No recording found           */
        /* ---------------------------- */

        if (!interview?.recording) {
          return;
        }


        /* ---------------------------- */
        /* Question                      */
        /* ---------------------------- */

        if (interview.session) {

          setQuestion(
            interview.session.question
          );

        }


        /* ---------------------------- */
        /* Video                         */
        /* ---------------------------- */

        if (interview.recording) {

          url = URL.createObjectURL(
            interview.recording.videoBlob
          );

          setVideoURL(url);

          setVideoBlob(
            interview.recording.videoBlob
          );


          /* -------------------------- */
          /* Transcript                  */
          /* -------------------------- */

          setTranscript(
            interview.recording.transcript || ""
          );


          /* -------------------------- */
          /* Duration                    */
          /* -------------------------- */

          setDuration(
            interview.recording.duration || 0
          );

        }

      } catch (error) {

        console.error(
          "Failed to load interview draft:",
          error
        );

      }

    };


    load();


    /* -------------------------------- */
    /* Cleanup video URL                */
    /* -------------------------------- */

    return () => {

      if (url) {
        URL.revokeObjectURL(url);
      }

    };

  }, [navigate]);


  /* -------------------------------- */
  /* Speech Statistics                */
  /* -------------------------------- */

  const speechStats = useMemo(() => {

    return calculateSpeechStats(
      transcript,
      duration
    );

  }, [
    transcript,
    duration,
  ]);


  /* -------------------------------- */
  /* Analyze Interview               */
  /* -------------------------------- */

  const handleAnalyze = async () => {

    /* -------------------------------- */
    /* Validate Transcript              */
    /* -------------------------------- */

    if (!transcript.trim()) {

      setTranscriptError(
        "Transcript cannot be empty. Please provide your answer before analyzing."
      );

      return;
    }


    /* -------------------------------- */
    /* Clear Previous Error             */
    /* -------------------------------- */

    setTranscriptError("");


    try {

      setLoading(true);


      /* -------------------------------- */
      /* STEP 1: Generate AI Analysis     */
      /* -------------------------------- */

      const analysisResponse =
        await analyzeInterview({

          question: question?.title,

          transcript,

          duration,

          speechStats,

        });


      /* -------------------------------- */
      /* STEP 2: Prepare FormData         */
      /* -------------------------------- */

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
        JSON.stringify(
          analysisResponse.analysis
        )
      );


      /* -------------------------------- */
      /* STEP 3: Save Interview           */
      /* -------------------------------- */

      const saveResponse =
        await saveInterview(formData);


      console.log(
        "SAVE RESPONSE:",
        saveResponse
      );


      /* -------------------------------- */
      /* STEP 4: Get Session ID           */
      /* -------------------------------- */

      const sessionId =
        saveResponse.sessionId;


      /* -------------------------------- */
      /* STEP 5: Navigate to Review       */
      /* -------------------------------- */

      navigate(
        `/review/${sessionId}`,
        {
          replace: true,
        }
      );

    } catch (error) {

      console.error(
        "Analyze/Save failed:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  /* -------------------------------- */
  /* Format Duration                  */
  /* -------------------------------- */

  const formatDuration = (seconds) => {

    const mins = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${mins
      .toString()
      .padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;

  };


  /* -------------------------------- */
  /* Handle Transcript Change         */
  /* -------------------------------- */

  const handleTranscriptChange = (e) => {

    const value = e.target.value;

    setTranscript(value);


    /* -------------------------------- */
    /* Clear Error When User Types      */
    /* -------------------------------- */

    if (value.trim()) {

      setTranscriptError("");

    }

  };


  /* -------------------------------- */
  /* UI                               */
  /* -------------------------------- */

  return (
    <>

      {/* Loading Overlay */}
      {loading && (
        <ShowLoading
          message="Analyzing your interview...Do not go back..."
        />
      )}


      <div className="min-h-screen bg-gray-50">

        {/* PAGE CONTAINER */}
        <div className="max-w-5xl mx-auto px-6 py-8">


          {/* ================================== */}
          {/* HEADER                             */}
          {/* ================================== */}

          <div className="mb-8">

            <span
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-indigo-50
                text-indigo-600
                text-sm
                font-medium
              "
            >

              <FileText size={16} />

              Review Your Answer

            </span>


            <h1
              className="
                mt-5
                text-3xl
                font-bold
                text-slate-900
                tracking-tight
              "
            >
              Confirm your transcript
            </h1>


            <p
              className="
                mt-3
                text-sm
                text-slate-500
                max-w-4xl
              "
            >
              This is what our speech recognition captured.
              Review it, fix any errors, then submit for
              analysis.{" "}

              <span className="font-semibold text-slate-800">
                The AI will analyze ONLY this text.
              </span>

            </p>

          </div>


          {/* ================================== */}
          {/* TOP SECTION                        */}
          {/* ================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


            {/* VIDEO CARD */}
            <div
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                border
                border-slate-100
              "
            >

              {videoURL && (
                <video
                  controls
                  src={videoURL}
                  className="
                    w-full
                    h-full
                    aspect-video
                    object-cover
                  "
                />
              )}

            </div>


            {/* SESSION INFO */}
            <div
              className="
                bg-white
                rounded-3xl
                border
                border-slate-100
                shadow-sm
                p-7
              "
            >

              <h3
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Session Info
              </h3>


              <div className="mt-7 space-y-6">


                {/* Question */}
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6">

                  <span className="text-slate-500">
                    Question
                  </span>

                  <span
                    className="
                      font-semibold
                      text-slate-800
                      break-words
                      sm:text-right
                    "
                  >
                    {question?.title ||
                      "No Question Found"}
                  </span>

                </div>


                {/* Duration */}
                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Duration
                  </span>

                  <span
                    className="
                      font-semibold
                      text-slate-800
                    "
                  >
                    <span
                      className="
                        text-slate-400
                        font-normal
                      "
                    >
                      {speechStats.duration}
                    </span>
                  </span>

                </div>


                {/* Words */}
                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Words captured
                  </span>

                  <span className="font-bold text-slate-900">
                    {speechStats.words}
                  </span>

                </div>

              </div>


              {/* WARNING */}
              <div
                className="
                  mt-8
                  rounded-2xl
                  bg-amber-50
                  border
                  border-amber-100
                  p-4
                "
              >

                <div className="flex gap-3">

                  <AlertCircle
                    size={18}
                    className="
                      text-amber-500
                      mt-0.5
                      shrink-0
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-amber-700
                      leading-relaxed
                    "
                  >
                    Speech recognition may miss words.
                    Edit the transcript below to ensure
                    accuracy before analysis.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================================== */}
          {/* TRANSCRIPT CARD                    */}
          {/* ================================== */}

          <div
            className="
              mt-8
              bg-white
              border
              border-slate-100
              rounded-3xl
              shadow-sm
              p-6
            "
          >

            {/* Transcript Header */}
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
                {speechStats.words} words
              </span>

            </div>


            {/* Textarea Container */}
            <div
              className="
                mt-5
                border-2
                border-dashed
                border-slate-200
                rounded-3xl
                p-6
              "
            >

              <textarea
                value={transcript}
                onChange={handleTranscriptChange}
                placeholder="Type your answer here to get AI feedback..."
                className={`
                  w-full
                  min-h-[220px]
                  resize-none
                  rounded-2xl
                  border
                  px-5
                  py-4
                  text-lg
                  outline-none
                  transition
                  ${
                    transcriptError
                      ? "border-red-400 focus:ring-4 focus:ring-red-100"
                      : "border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                  }
                `}
              />


              {/* ================================= */}
              {/* TRANSCRIPT ERROR                  */}
              {/* ================================= */}

              {transcriptError && (

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-3
                    px-1
                  "
                >

                  <AlertCircle
                    size={16}
                    className="
                      text-red-500
                      shrink-0
                    "
                  />

                  <p
                    className="
                      text-sm
                      font-medium
                      text-red-600
                    "
                  >
                    {transcriptError}
                  </p>

                </div>

              )}

            </div>

          </div>


          {/* ================================== */}
          {/* ACTIONS                            */}
          {/* ================================== */}

          <div
            className="
              mt-8
              flex
              flex-col-reverse
              items-stretch
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* Re-record */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/startRecording",
                  {
                    replace: true,
                  }
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-2xl
                border
                border-slate-200
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


            {/* Analyze */}
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-8
                py-4
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
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:scale-100
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

    </>
  );
};

export default AnalyzePage;

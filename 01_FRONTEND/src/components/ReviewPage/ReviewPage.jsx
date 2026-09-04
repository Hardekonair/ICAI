import { useLocation } from "react-router-dom";
import ReviewHeader from "./ReviewHeader";
import VideoSection from "./VideoSection";
import TranscriptCard from "./TranscriptCard";
import ScoreCard from "./ScoreCard";
import SpeechStatsCard from "./SpeechStatsCard";
import DimensionBreakdown from "./DimensionBreakdown";
import ImprovementTips from "./ImprovementTips";
import SuggestedFramework from "./SuggestedFramework";
import ActionButtons from "./ActionButton";
import { useEffect, useState } from "react";
import { getInterviewDraft } from "../../utils/interviewStorage";
import OverallFeedbackCard from "./OverallFeedbackCard";
import DimensionSummaryCard from "./DimensionSummaryCard";

const ReviewPage = () => {
  const { state } = useLocation();
  const [videoUrl, setVideoUrl] = useState(null)
  const [videoBlob, setVideoBlob] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
  const load = async () => {
    const interview = await getInterviewDraft();

    if (interview?.recording) {

        const url = URL.createObjectURL(interview.recording.videoBlob);

        setVideoUrl(url);

        setVideoBlob(interview.recording.videoBlob);

        setDuration(interview.recording.duration);

    }
  };

  load();

  return () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
  };
}, []);

  const {
    question,
    transcript,
    analysis,
    speechStats
  } = state || {};

  console.log(analysis);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-10">

      <ReviewHeader question={question} />

      <div className="max-w-7xl mx-auto px-6">

        {/* VIDEO + TRANSCRIPT */}

        {/* ================= Interview Overview ================= */}
        <div className="grid lg:grid-cols-[0.75fr_1fr] gap-6 mt-8">

          <VideoSection videoUrl={videoUrl} />

          <TranscriptCard
            transcript={transcript}
          />

        </div>



        {/* SUMMARY + DIMENSIONS */}

        <div className="grid lg:grid-cols-[1fr_1.34fr] gap-6 mt-6">

            {/* LEFT COLUMN */}
            <div className="space-y-4">

                <div className="grid grid-cols-2 gap-4">

                    <ScoreCard
                        score={analysis?.overallScore || 0}
                    />

                    <SpeechStatsCard
                        stats={speechStats}
                    />

                </div>

                <OverallFeedbackCard
                    feedback={analysis?.overallFeedback}
                />

            </div>

            {/* RIGHT COLUMN */}

            <DimensionSummaryCard
                dimensions={analysis?.dimensions}
            />

        </div>


        {/* ================= Performance ================= */}

        <div className="mt-8">

            <DimensionBreakdown
                dimensions={analysis?.dimensions}
            />

        </div>

        {/* ================= Improvement ================= */}

        <div className="mt-8">

            <ImprovementTips
                tips={analysis?.improvementTips}
            />

        </div>

        {/* ================= Framework ================= */}

        <div className="mt-8">

            <SuggestedFramework
                framework={analysis?.framework}
            />

        </div>


        {/* ANALYSIS SECTION */}

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-6">

          <div className="space-y-6">

            {/* <ScoreCard
              score={analysis?.overallScore || 0}
            />

            <SpeechStatsCard
              stats={speechStats}
            /> */}

            {/* <ProTipCard /> */}

          </div>

          {/* <div className="space-y-6">

            <DimensionBreakdown
              dimensions={analysis?.dimensions}
            />

            <ImprovementTips
              tips={analysis?.improvementTips}
            />

            <SuggestedFramework
              framework={analysis?.framework}
            />

          </div> */}

        </div>

        <ActionButtons
          videoBlob={videoBlob}
          question={question}
          transcript={transcript}
          duration={duration}
          speechStats={speechStats}
          analysis={analysis}
      />

      </div>
    </div>
  );
};

export default ReviewPage;
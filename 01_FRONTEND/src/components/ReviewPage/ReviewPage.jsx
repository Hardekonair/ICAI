import { useLocation } from "react-router-dom";
import ReviewHeader from "./ReviewHeader";
import VideoSection from "./VideoSection";
import TranscriptCard from "./TranscriptCard";
import ScoreCard from "./ScoreCard";
import SpeechStatsCard from "./SpeechStatsCard";
import ProTipCard from "./ProTipCard";
import DimensionBreakdown from "./DimensionBreakdown";
import ImprovementTips from "./ImprovementTips";
import SuggestedFramework from "./SuggestedFramework";
import ActionButtons from "./ActionButton";
import { useEffect, useState } from "react";
import { getInterviewDraft } from "../../utils/interviewStorage";

const ReviewPage = () => {
  const { state } = useLocation();
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(() => {
  const load = async () => {
    const interview = await getInterviewDraft();

    if (interview?.recording?.videoBlob) {
      const url = URL.createObjectURL(
        interview.recording.videoBlob
      );
      setVideoUrl(url);
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
    analysis
  } = state || {};

  console.log(analysis);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-10">

      <ReviewHeader question={question} />

      <div className="max-w-7xl mx-auto px-6">

        {/* VIDEO + TRANSCRIPT */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <VideoSection videoUrl={videoUrl} />

          <TranscriptCard
            transcript={transcript}
            // fillerWords={analysis?.speechStats?.fillerWords || 0}
            // words={analysis?.speechStats?.words || 0}
            // sentences={analysis?.speechStats?.sentences || 0}
            // pace={analysis?.speechStats?.pace || 0}
          />

        </div>

        {/* ANALYSIS SECTION */}

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-6">

          <div className="space-y-6">

            <ScoreCard
              score={analysis?.overallScore || 0}
            />

            <SpeechStatsCard
              stats={analysis?.speechStats}
            />

            <ProTipCard />

          </div>

          <div className="space-y-6">

            <DimensionBreakdown
              dimensions={analysis?.dimensions}
            />

            <ImprovementTips
              tips={analysis?.improvementTips}
            />

            <SuggestedFramework
              framework={analysis?.framework}
            />

          </div>

        </div>

        <ActionButtons />

      </div>
    </div>
  );
};

export default ReviewPage;
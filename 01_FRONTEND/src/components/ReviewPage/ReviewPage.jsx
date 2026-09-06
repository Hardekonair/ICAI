import { useParams  } from "react-router-dom";
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
// import { getInterviewDraft } from "../../utils/interviewStorage";
import OverallFeedbackCard from "./OverallFeedbackCard";
import DimensionSummaryCard from "./DimensionSummaryCard";
import { getInterviewSession } from "../../services/interviewApi";
import ShowLoading from "../ShowLoading";

const ReviewPage = () => {
  const {sessionId} = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const loadSession = async () => {

          try {

              const response =
                  await getInterviewSession(sessionId);

              setSession(response.interview);

          } catch (error) {

              console.error(
                  "Failed to load interview:",
                  error
              );

          } finally {

              setLoading(false);

          }

      };
      
      loadSession();
      
    }, [sessionId]);
      
      if (loading) {
        return (
            <ShowLoading message="Loading your interview review..." />
        );
      }
      
      if (!session) {
        return <div>Interview not found.</div>;
  }
  
  const {
      question,
      transcript,
      analysis,
      speechStats,
      duration,
      videoUrl
    } = session;


  // console.log(analysis);

  return (
    
    <div className="min-h-screen bg-[#f8fafc] pb-10">

      <ReviewHeader question={question} />

      <div className="max-w-7xl mx-auto px-6">

        {/* VIDEO + TRANSCRIPT */}

        {/* ================= Interview Overview ================= */}
        <div className="grid lg:grid-cols-[0.75fr_1fr] gap-6 mt-8">

          <VideoSection videoUrl={session.videoUrl} />

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

          </div>

        </div>

        <ActionButtons
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
import { useParams } from "react-router-dom";
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
    const { sessionId } = useParams();
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

        <div className="min-h-screen bg-[#f8fafc] pb-10  ">

            <ReviewHeader question={question} />

            <div className="max-w-5xl mx-auto px-9">

                {/* VIDEO + TRANSCRIPT */}

                {/* ================= Interview Overview ================= */}
                <div className="grid lg:grid-cols-[0.8fr_1fr_auto] gap-4 mt-4 items-stretch">

                    {/* Video */}
                    <div className="min-w-0">
                        <VideoSection videoUrl={session.videoUrl} />
                    </div>

                    {/* Transcript */}
                    <div className="min-w-0">
                        <TranscriptCard
                            transcript={transcript}
                            fillerWords={speechStats?.fillerWords}
                            words={speechStats?.words}
                            sentences={speechStats?.sentences}
                            pace={speechStats?.pace}
                        />
                    </div>

                    {/* Overall Score - minimum required space */}
                    <div className="w-[150px]">
                        <ScoreCard
                            score={analysis?.overallScore || 0}
                        />
                    </div>

                </div>



                {/* SUMMARY + DIMENSIONS */}

                <div className="grid lg:grid-cols-[1fr_1fr] gap-4 mt-4 items-stretch">

    {/* LEFT — Overall Feedback */}
    <div className="min-w-0">
        <OverallFeedbackCard
            feedback={analysis?.overallFeedback}
        />
    </div>

    {/* RIGHT — Competency Scores */}
    <div className="min-w-0">
        <DimensionSummaryCard
            dimensions={analysis?.dimensions}
        />
    </div>

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
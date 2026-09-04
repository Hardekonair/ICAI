import InterviewAISession from "../models/InterviewAISession.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all sessions of the logged-in user
    const sessions = await InterviewAISession.find({ userId })
      .sort({ createdAt: -1 });

    // --------------------------------
    // 1. TOTAL SESSIONS
    // --------------------------------

    const totalSessions = sessions.length;

    // --------------------------------
    // 2. AVERAGE SCORE
    // --------------------------------

    const scores = sessions
      .map((session) => session.analysis?.overallScore)
      .filter((score) => typeof score === "number");

    const averageScore =
      scores.length > 0
        ? Math.round(
            scores.reduce((sum, score) => sum + score, 0) /
              scores.length
          )
        : 0;

    // --------------------------------
    // 3. TOTAL PRACTICE TIME
    // duration is stored in seconds
    // --------------------------------

    const totalSeconds = sessions.reduce(
      (total, session) => total + session.duration,
      0
    );

    const practiceMinutes = Math.round(totalSeconds / 60);

    // --------------------------------
    // SEND RESPONSE
    // --------------------------------

    res.status(200).json({
      stats: {
        sessions: totalSessions,
        averageScore,
        practiceMinutes,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};
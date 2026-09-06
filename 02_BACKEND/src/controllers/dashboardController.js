import InterviewAISession from "../models/interview.model.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all sessions of the logged-in user
    const sessions = await InterviewAISession.find({ userId })
      .sort({ createdAt: -1 });

    // Calculate current streak
    const practiceDates = [
    ...new Set(
        sessions.map((session) =>
        new Date(session.createdAt).toISOString().split("T")[0]
        )
    ),
    ];

    let streak = 0;

    if (practiceDates.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const latestDate = new Date(practiceDates[0]);
    latestDate.setHours(0, 0, 0, 0);

    // Difference between today and latest practice day
    const difference =
        (today - latestDate) / (1000 * 60 * 60 * 24);

    // Streak is active only if practiced today or yesterday
    if (difference <= 1) {
        streak = 1;

        for (let i = 1; i < practiceDates.length; i++) {
        const current = new Date(practiceDates[i - 1]);
        const previous = new Date(practiceDates[i]);

        current.setHours(0, 0, 0, 0);
        previous.setHours(0, 0, 0, 0);

        const diff =
            (current - previous) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
            streak++;
        } else {
            break;
        }
        }
    }
    }

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

    const skillScores = {
        Clarity: [],
        Confidence: [],
        Structure: [],
        Fluency: [],
        Pace: [],
        };

        sessions.forEach((session) => {
        session.analysis?.dimensions?.forEach((dimension) => {
            if (skillScores[dimension.title]) {
            skillScores[dimension.title].push(dimension.score);
            }
        });

        if (typeof session.speechStats?.pace === "number") {
            skillScores.Pace.push(session.speechStats.pace);
        }
    });

    // {
        // Clarity: [40, 70, 80],
        // Confidence: [53, 65, 75],
        // Structure: [0, 60, 72],
        // Fluency: [73, 80, 85],
        // Pace: [70, 75, 68]
    // }

    const skills = {};

        Object.keys(skillScores).forEach((skill) => {
        const scores = skillScores[skill];

        skills[skill] =
            scores.length > 0
            ? Math.round(
                scores.reduce((sum, score) => sum + score, 0) / scores.length
                )
            : 0;
    });

    // {
    //     Clarity: 63,
    //     Confidence: 64,
    //     Structure: 44,
    //     Fluency: 79,
    //     Pace: 71
    // }

    // --------------------------------
    // WEEKLY GOAL
    // Monday -> Sunday
    // Using India timezone
    // --------------------------------

    const now = new Date();

    // Get today's date in India
    const indiaToday = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    // Example:
    // "2026-09-07"

    const [year, month, date] = indiaToday
      .split("-")
      .map(Number);

    // Create date using India calendar
    const todayIndia = new Date(
      Date.UTC(year, month - 1, date)
    );

    // JS:
    // Sunday = 0
    // Monday = 1
    // ...
    // Saturday = 6

    const dayOfWeek = todayIndia.getUTCDay();

    // Number of days to go back to Monday
    const daysFromMonday =
      dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Monday's date
    const mondayIndia = new Date(todayIndia);

    mondayIndia.setUTCDate(
      todayIndia.getUTCDate() - daysFromMonday
    );

    // Sunday + 1 = next Monday
    const nextMondayIndia = new Date(mondayIndia);

    nextMondayIndia.setUTCDate(
      mondayIndia.getUTCDate() + 7
    );


    // Convert Monday 00:00 IST to UTC.
    //
    // IST = UTC + 5:30
    // Therefore:
    // India 00:00 = UTC previous day 18:30

    const startOfWeek = new Date(
      mondayIndia.getTime() - (5.5 * 60 * 60 * 1000)
    );

    const endOfWeek = new Date(
      nextMondayIndia.getTime() - (5.5 * 60 * 60 * 1000)
    );


    // Get sessions from this week
    const weeklySessions = sessions.filter((session) => {

      const sessionDate = new Date(session.createdAt);

      return (
        sessionDate >= startOfWeek &&
        sessionDate < endOfWeek
      );
    });


    // Find which days were practiced
    const practicedDays = weeklySessions.map((session) => {

      const sessionIndiaDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(session.createdAt));

      const [sessionYear, sessionMonth, sessionDay] =
        sessionIndiaDate.split("-").map(Number);

      const sessionDate = new Date(
        Date.UTC(
          sessionYear,
          sessionMonth - 1,
          sessionDay
        )
      );

      const day = sessionDate.getUTCDay();

      // Convert:
      // Monday = 0
      // Tuesday = 1
      // ...
      // Sunday = 6

      return day === 0 ? 6 : day - 1;
    });


    const uniquePracticeDays = [
      ...new Set(practicedDays)
    ];


    const weeklyGoal = {
      completed: weeklySessions.length,
      target: 5,
      practicedDays: uniquePracticeDays,
    };


    // --------------------------------
    // SEND RESPONSE
    // --------------------------------

    res.status(200).json({
      stats: {
        sessions: totalSessions,
        averageScore,
        practiceMinutes,
        streak,
      },
      skills,
      sessions,
      weeklyGoal,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};
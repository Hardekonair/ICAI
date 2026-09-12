import InterviewAISession from "../models/interview.model.js";

const INDIA_TIMEZONE = "Asia/Kolkata";
const DAILY_TARGET = 5;


// --------------------------------------------------
// Get YYYY-MM-DD in India timezone
// --------------------------------------------------

const getIndiaDateString = (date) => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: INDIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};


// --------------------------------------------------
// Convert YYYY-MM-DD to UTC date
// Used only for calendar calculations
// --------------------------------------------------

const createUTCDate = (dateString) => {
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return new Date(
    Date.UTC(
      year,
      month - 1,
      day
    )
  );
};


// --------------------------------------------------
// Convert JS day:
// Sunday = 0
// Monday = 1
//
// Into:
// Monday = 0
// Tuesday = 1
// ...
// Sunday = 6
// --------------------------------------------------

const getMondayBasedDayIndex = (date) => {
  const day = date.getUTCDay();

  return day === 0
    ? 6
    : day - 1;
};


// ==================================================
// DASHBOARD
// ==================================================

export const getDashboard = async (req, res) => {

  try {

    const userId = req.user.id;


    // ==================================================
    // GET USER SESSIONS
    // ==================================================

    const sessions = await InterviewAISession
      .find({ userId })
      .sort({ createdAt: -1 });


    // ==================================================
    // 1. TOTAL SESSIONS
    // ==================================================

    const totalSessions = sessions.length;


    // ==================================================
    // 2. CURRENT STREAK
    // ==================================================

    const practiceDates = [
      ...new Set(
        sessions.map((session) =>
          getIndiaDateString(session.createdAt)
        )
      ),
    ];

    // Sort newest → oldest
    practiceDates.sort(
      (a, b) =>
        createUTCDate(b) - createUTCDate(a)
    );


    let streak = 0;


    if (practiceDates.length > 0) {

      const todayIndiaString =
        getIndiaDateString(new Date());

      const todayIndia =
        createUTCDate(todayIndiaString);


      const latestPracticeDate =
        createUTCDate(practiceDates[0]);


      const difference =
        Math.round(
          (
            todayIndia -
            latestPracticeDate
          ) /
          (1000 * 60 * 60 * 24)
        );


      // Streak is active only if
      // practiced today or yesterday

      if (difference <= 1) {

        streak = 1;


        for (
          let i = 1;
          i < practiceDates.length;
          i++
        ) {

          const current =
            createUTCDate(
              practiceDates[i - 1]
            );

          const previous =
            createUTCDate(
              practiceDates[i]
            );


          const diff =
            Math.round(
              (
                current -
                previous
              ) /
              (1000 * 60 * 60 * 24)
            );


          if (diff === 1) {

            streak++;

          } else {

            break;

          }
        }
      }
    }


    // ==================================================
    // 3. AVERAGE SCORE
    // ==================================================

    const scores = sessions
      .map(
        (session) =>
          session.analysis?.overallScore
      )
      .filter(
        (score) =>
          typeof score === "number"
      );


    const averageScore =
      scores.length > 0
        ? Math.round(
            scores.reduce(
              (sum, score) =>
                sum + score,
              0
            ) /
            scores.length
          )
        : 0;


    // ==================================================
    // 4. TOTAL PRACTICE TIME
    // ==================================================

    const totalSeconds =
      sessions.reduce(
        (total, session) =>
          total +
          (session.duration || 0),
        0
      );


    const practiceMinutes =
      Math.round(
        totalSeconds / 60
      );


    // ==================================================
    // 5. SKILL SCORES
    // ==================================================

    const skillScores = {

      Clarity: [],

      Confidence: [],

      Structure: [],

      Fluency: [],

      Pace: [],

    };


    sessions.forEach((session) => {

      session.analysis?.dimensions?.forEach(
        (dimension) => {

          if (
            skillScores[
              dimension.title
            ]
          ) {

            skillScores[
              dimension.title
            ].push(
              dimension.score
            );

          }
        }
      );


      if (
        typeof session.speechStats?.pace ===
        "number"
      ) {

        skillScores.Pace.push(
          session.speechStats.pace
        );

      }

    });


    const skills = {};


    Object.keys(skillScores).forEach(
      (skill) => {

        const scores =
          skillScores[skill];


        skills[skill] =
          scores.length > 0
            ? Math.round(
                scores.reduce(
                  (sum, score) =>
                    sum + score,
                  0
                ) /
                scores.length
              )
            : 0;

      }
    );


    // ==================================================
    // 6. INDIA TODAY
    // ==================================================

    const indiaToday =
      getIndiaDateString(
        new Date()
      );


    const todayIndia =
      createUTCDate(
        indiaToday
      );


    // ==================================================
    // 7. CURRENT WEEK
    // Monday → Sunday
    // ==================================================

    const todayDay =
      todayIndia.getUTCDay();


    const daysFromMonday =
      todayDay === 0
        ? 6
        : todayDay - 1;


    // Monday
    const mondayIndia =
      new Date(todayIndia);


    mondayIndia.setUTCDate(
      todayIndia.getUTCDate() -
      daysFromMonday
    );


    // Next Monday
    const nextMondayIndia =
      new Date(mondayIndia);


    nextMondayIndia.setUTCDate(
      mondayIndia.getUTCDate() +
      7
    );


    // ==================================================
    // INDIA MIDNIGHT → UTC
    //
    // IST = UTC + 5:30
    // India 00:00
    // = previous day 18:30 UTC
    // ==================================================

    const startOfWeek =
      new Date(
        mondayIndia.getTime() -
        5.5 *
          60 *
          60 *
          1000
      );


    const endOfWeek =
      new Date(
        nextMondayIndia.getTime() -
        5.5 *
          60 *
          60 *
          1000
      );


    // ==================================================
    // 8. GET THIS WEEK'S SESSIONS
    // ==================================================

    const weeklySessions =
      sessions.filter(
        (session) => {

          const sessionDate =
            new Date(
              session.createdAt
            );


          return (
            sessionDate >=
              startOfWeek &&
            sessionDate <
              endOfWeek
          );

        }
      );


    // ==================================================
    // 9. SESSION COUNT FOR EACH DAY
    //
    // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
    // ==================================================

    const dailySessions = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];


    weeklySessions.forEach(
      (session) => {

        const sessionIndiaDate =
          getIndiaDateString(
            session.createdAt
          );


        const sessionDate =
          createUTCDate(
            sessionIndiaDate
          );


        const dayIndex =
          getMondayBasedDayIndex(
            sessionDate
          );


        dailySessions[
          dayIndex
        ]++;

      }
    );


    // ==================================================
    // 10. TODAY'S SESSIONS
    // ==================================================

    const todaySessions =
      sessions.filter(
        (session) => {

          return (
            getIndiaDateString(
              session.createdAt
            ) ===
            indiaToday
          );

        }
      );


    // ==================================================
    // 11. DAILY GOAL
    // ==================================================

    const dailyGoal = {

      // Today's number of sessions
      completed:
        todaySessions.length,

      // Daily target
      target:
        DAILY_TARGET,

      // Each day's session count
      //
      // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
      dailySessions,

    };


    // ==================================================
    // 12. WEEKLY GOAL
    // ==================================================

    const weeklyGoal = {

      completed:
        weeklySessions.length,

      target:
        DAILY_TARGET,

      dailySessions,

    };


    // ==================================================
    // 13. RESPONSE
    // ==================================================

    return res.status(200).json({

      stats: {

        sessions:
          totalSessions,

        averageScore:
          averageScore,

        practiceMinutes:
          practiceMinutes,

        streak:
          streak,

      },


      skills,


      sessions,


      dailyGoal,


      weeklyGoal,

    });


  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Failed to load dashboard",

    });

  }
};
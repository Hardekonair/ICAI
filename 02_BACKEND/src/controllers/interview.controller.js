// export const analyzeInterview = async (req, res) => {

//   const { question, transcript, duration } = req.body;

//   console.log(question);
//   console.log(transcript);
//   console.log(duration);

//   return res.json({success:true});

// };

// export const analyzeInterview = async (req, res) => {

//   console.log("CONTROLLER HIT");

//   const { question, transcript, duration } = req.body;

//   // return res.json({success:true});
//   console.log("RETURNING NEW ANALYSIS");
//   return res.json({
//       success: true,

//       analysis: {
//         overallScore: 82,

//         speechStats: {
//           words: 120,
//           fillerWords: 8,
//           pace: 110,
//           sentences: 12
//         },

//         dimensions: [
//           {
//             title: "Clarity",
//             score: 85,
//             description: "Your answer was easy to understand."
//           },
//           {
//             title: "Confidence",
//             score: 75,
//             description: "Try speaking more assertively."
//           },
//           {
//             title: "Relevance",
//             score: 90,
//             description: "You stayed focused on the question."
//           }
//         ],

//         improvementTips: [
//           {
//             title: "Reduce filler words",
//             description: "Avoid using unnecessary filler words.",
//             priority: "High"
//           },
//           {
//             title: "Add stronger examples",
//             description: "Support your answers with real examples.",
//             priority: "Medium"
//           },
//           {
//             title: "Use STAR structure",
//             description: "Organize answers using STAR format.",
//             priority: "High"
//           }
//         ],

//         framework: {
//           title: "STAR Method",
//           description:
//             "Situation, Task, Action, Result."
//         }
//       }
//     });
// };

import { generateInterviewAnalysis } from "../services/analysis.services.js";

export const analyzeInterview =
async (req, res) => {

  try {

    console.log("CONTROLLER HIT");

    const {
      question,
      transcript,
      duration,
      speechStats
    } = req.body;

    const analysis =
      await generateInterviewAnalysis({
        question,
        transcript,
        speechStats
      });

    console.log(
      "RETURNING GEMINI ANALYSIS"
    );

    return res.json({
      success: true,
      analysis
    });

  } catch(error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
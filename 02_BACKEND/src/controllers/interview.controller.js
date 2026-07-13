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

import interviewModel from "../models/interview.model.js";
import { generateInterviewAnalysis } from "../services/analysis.services.js";
import { uploadVideo } from "../services/upload.service.js";

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


// =========================================
// Save Interview
// =========================================
export const saveInterview = async (req, res) => {

    try {

        console.log("SAVE INTERVIEW CONTROLLER HIT");

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user.",
            });

        }

        // -----------------------------------------
        // Uploaded Video
        // -----------------------------------------
        const file = req.file;

        if (!file) {

            return res.status(400).json({
                success: false,
                message: "Video file is required.",
            });

        }

        // -----------------------------------------
        // Parse JSON fields safely
        // -----------------------------------------
        let question;
        let speechStats;
        let analysis;

        try {

            question = JSON.parse(req.body.question);

            speechStats = JSON.parse(req.body.speechStats);

            analysis = JSON.parse(req.body.analysis);

        }
        catch {

            return res.status(400).json({
                success: false,
                message: "Invalid JSON payload.",
            });

        }

        // -----------------------------------------
        // Remaining Fields
        // -----------------------------------------
        const transcript = req.body.transcript;

        const duration = Number(req.body.duration);

        // -----------------------------------------
        // Upload Video to Cloudinary
        // -----------------------------------------
        const uploadResult = await uploadVideo(file.buffer);

        // -----------------------------------------
        // Save Interview
        // -----------------------------------------
        const interview =
            await interviewModel.create({

                userId,

                question,

                transcript,

                duration,

                videoUrl: uploadResult.videoUrl,

                speechStats,

                analysis,

            });

        console.log("INTERVIEW SAVED");

        return res.status(201).json({

            success: true,

            message: "Interview saved successfully.",

            interview,

        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
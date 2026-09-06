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

            sessionId: interview._id,

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

export const getInterviewSession = async (req, res) => {
    try {

        const userId = req.user.id;
        const { sessionId } = req.params;

        const interview = await interviewModel.findOne({
            _id: sessionId,
            userId: userId
        });

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found."
            });
        }

        return res.status(200).json({
            success: true,
            interview
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    // ============================
    // User Information
    // ============================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewAI",
      required: true,
      index: true,
    },

    // ============================
    // Question Snapshot
    // ============================
    question: {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewAIQuestion",
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
      },

      type: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // ============================
    // Candidate Response
    // ============================
    transcript: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number, // seconds
      required: true,
      min: 0,
    },

    // ============================
    // Recorded Video
    // ============================
    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================
    // Speech Statistics
    // ============================
    speechStats: {
      words: {
        type: Number,
        default: 0,
      },

      pace: {
        type: Number,
        default: 0,
      },

      fillerWords: {
        type: Number,
        default: 0,
      },

      sentences: {
        type: Number,
        default: 0,
      },
    },

    // ============================
    // AI Analysis
    // ============================
    analysis: {
      overallScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },

      dimensions: [
        {
          name: {
            type: String,
            required: true,
          },

          score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
          },

          feedback: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],

      strengths: [
        {
          type: String,
          trim: true,
        },
      ],

      weaknesses: [
        {
          type: String,
          trim: true,
        },
      ],

      improvementTips: [
        {
          type: String,
          trim: true,
        },
      ],

      suggestedFramework: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const InterviewModel = mongoose.model(
  "InterviewAIInterview",
  interviewSchema
);

export default InterviewModel;
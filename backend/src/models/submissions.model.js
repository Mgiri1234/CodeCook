import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        default: "PENDING"
    },
    submissionTime: {
        type: Date,
        default: Date.now
    },
    timeTaken: {
        type: Number,
        default: 0
    },
    memoryUsed: {
        type: Number,
        default: 0
    }
}
)

export const Submission = mongoose.model("Submission", submissionSchema);
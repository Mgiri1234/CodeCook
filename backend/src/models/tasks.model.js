import mongoose, {Schema} from "mongoose";

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Task name is required"],
        trim: true
    },
    statement:{
        type: String,
        required: [true, "Task statement is required"],
        trim: true
    },
    constraints: {
        type: [String],
        required: [true, "Task constraints are required"],
    },
    format: {
        type: String,
        required: [true, "Task format is required"],
    },
    testcases: {
        type: [Schema.Types.Mixed],
        default: []
    },
    tag: {
        type: [String],
        default: []
    },
    timeLimit: {
        type: Number,
        default: 1          //in seconds
    },
    memoryLimit: {
        type: Number,
        default: 256        //in MB
    },
}, {timestamps: true}
)

export const Task = mongoose.model("Task", taskSchema);
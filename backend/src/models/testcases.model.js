import mongoose, {Schema} from "mongoose";

const testcaseSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
}
)

export const Testcase = mongoose.model("Testcase", testcaseSchema);
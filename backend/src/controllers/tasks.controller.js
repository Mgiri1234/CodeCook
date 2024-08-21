import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import { Task } from "../models/tasks.model.js";

const createTask = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to add tasks");
        }
        const { name, statement, constraints, format, testcases, tag, timeLimit, memoryLimit } = req.body;
        const task = await Task.create({
            name,
            statement,
            constraints,
            format,
            testcases,
            tag,
            timeLimit,
            memoryLimit
        });
        return res.status(201).json(new ApiResponse(201, task));
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

const updateTask = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to update tasks");
        }
        const { _id } = req.params;
        const { name, statement, constraints, format, testcases, tag, memoryLimit, timeLimit } = req.body;
        const task = await Task.findByIdAndUpdate(_id, {
            name,
            statement,
            constraints,
            format,
            testcases,
            tag,
            memoryLimit,
            timeLimit
        });
        const updatedTask = await Task.findById(_id);
        return res.status(200).json(new ApiResponse(200, updatedTask));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const deleteTask = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to delete tasks");
        }
        const { _id } = req.params;
        const task = await Task.findByIdAndDelete(_id);
        next();
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getTask = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const task = await Task.findById(_id);
        return res.status(200).json(new ApiResponse(200, task));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getAllTasks = asyncHandler(async (req, res, next) => {

    const tasks = await Task.find({});
    return res.status(200).json(new ApiResponse(200, tasks));
})

const getTaskName = async (req, res, next) => {
    try {
        const task = await Task.findById(req.body.submission.taskId);
        req.body.taskName = task.name;
        res.status(200).json(new ApiResponse(200, req.body));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getTasksName = async (req, res, next) => {
    try {
        const submissions = req.body.submissions;
        for (let i = 0; i < submissions.length; i++) {
            const task = await Task.findById(submissions[i].taskId);
            submissions[i] = submissions[i].toObject();
            submissions[i].taskName = task.name;
        }
        req.body.submissions = submissions;
        req.body.handle= req.user.handle;
        res.status(200).json(new ApiResponse(200, req.body));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getConstraints= async (req, res, next) => {
    try {
        const taskId= req.body.taskId || req.body.problem_id;
        const task = await Task.findById(taskId);
        req.body.timeLimit = task.timeLimit;
        req.body.memoryLimit = task.memoryLimit;
        next();
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

export { createTask, updateTask, deleteTask, getTask, getAllTasks, getTaskName, getTasksName, getConstraints };
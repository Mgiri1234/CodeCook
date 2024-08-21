import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { Testcase } from "../models/testcases.model.js";

export const createTestcase = async (req, res, next) => {
    //creates a single testcase of a single problem
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to add testcases");
        }
        const { taskId, input, output } = req.body;
        const testcase = await Testcase.create({ taskId, input, output });
        return res.status(201).json(new ApiResponse(201, testcase));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const getTestcases = async (req, res, next) => {
    //finds testcases of a single problem only
    try {
        const taskId = req.query.taskId;
        const testcases = await Testcase.find({ taskId: taskId });
        return res.status(200).json(new ApiResponse(200, testcases));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const deleteTestcase = async (req, res, next) => {
    //deletes a single testcase of a single problem
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to delete testcases");
        }
        const id = req.query.id;
        const testcase = await Testcase.findByIdAndDelete(id);
        return res.status(200).json(new ApiResponse(200, testcase, "Testcase deleted successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const deleteAllTestcases = async (req, res, next) => {
    //deletes all testcases of a single problem
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to delete testcases");
        }
        const taskId = req.params._id;
        const testcases = await Testcase.deleteMany({ taskId: taskId });
        next();
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const updateTestcase = async (req, res, next) => {
    //updates a single testcase of a single problem
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to update testcases");
        }
        const id = req.query.id;
        const { input, output } = req.body;
        const testcase = await Testcase.findByIdAndUpdate(id, { input, output }, { new: true });
        return res.status(200).json(new ApiResponse(200, testcase, "Testcase updated successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const updateTestcasesOfProblem = async (req, res, next) => {
    //updates all testcases of a single problem
    try {
        if (!req.user.isAdmin) {
            throw new ApiError(403, "You are not authorized to update testcases");
        }
        const taskId = req.query.taskId;
        if(taskId === undefined) {
            throw new ApiError(400, "Please provide a taskId");
        }
        
        const testcasesFromBody = req.body.testcases;
        
        const testcasesFromDb = await Testcase.find({ taskId: taskId });

        // Update existing test cases and create new ones
        for (const testcaseFromBody of testcasesFromBody) {
            if (testcaseFromBody._id) {
                await Testcase.findByIdAndUpdate(testcaseFromBody._id, { input: testcaseFromBody.input, output: testcaseFromBody.output }, { new: true });
            } else {
                await Testcase.create({ taskId: taskId, input: testcaseFromBody.input, output: testcaseFromBody.output });
            }
        }

        // Delete test cases that don't appear in the request body
        for (const testcaseFromDb of testcasesFromDb) {
            if (!testcasesFromBody.some(testcase => testcase._id === testcaseFromDb._id.toString())) {
                await Testcase.findByIdAndDelete(testcaseFromDb._id);
            }
        }
        return res.status(200).json(new ApiResponse(200, {}, "Testcases updated successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const fetchTestcases = async (req, res, next) => {
    //finds all testcases of one problem for submission
    //Its a middleware
    try {
        const taskId = req.body.taskId || req.body.problem_id;
        if (taskId === undefined) {
            throw new ApiError(400, "Please provide a taskId");
        }
        const testcases = await Testcase.find({ taskId: taskId });
        req.body.testcases = testcases;
        next();
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const fetchTestcases2 = async (req, res, next) => {
    //finds all testcases of one problem for submission
    try {
        const taskId = req.body.taskId || req.body.problem_id;
        if (taskId === undefined) {
            throw new ApiError(400, "Please provide a taskId");
        }
        const testcases = await Testcase.find({ taskId: taskId });
        return res
            .status(200)
            .json(new ApiResponse(200, testcases, { message: "Testcases fetched successfully" }));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}
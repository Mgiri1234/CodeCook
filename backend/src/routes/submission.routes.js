import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();
import axios from 'axios';

const compiler_url = process.env.COMPILER_URL;

async function compileAndRun(req, res, next) {
    try {
        const response = await axios.post(`${compiler_url}/run`, req.body);
        
        return res.status(200).json({output:response.data.output});
    } catch (error) {
        const errorBody=error.response.data;
        res.status(500).json({ message: errorBody.error, error: errorBody.stderr });
    }
}

async function compileAndRunMultiple(req, res, next) {
    try {
        const response = await axios.post(`${compiler_url}/runOntest`, req.body);
        
        req.body.outputs = response.data.outputs;
        req.body.timeTaken = response.data.timeTaken;
        req.body.memoryUsed = response.data.memoryUsed;
        next();
    } catch (error) {
        const errorBody=error.response.data;
        res.status(500).json({ message: errorBody.error, error: errorBody.stderr });
    }
}

import {createSubmission, getSubmissions, getSubmission, getMostRecentSubmission, EvaluateSubmission, getHeatMapData} from '../controllers/submissions.controller.js';
import { fetchTestcases } from '../controllers/testcases.controller.js';
import { getTaskName, getTasksName, getConstraints } from '../controllers/tasks.controller.js';

router.route('/').get(verifyJWT,getSubmissions, getTasksName);
router.route('/one').post(verifyJWT,getSubmission, getTaskName);
router.route('/compile').post(compileAndRun);
router.route('/submit').post(verifyJWT,getConstraints,fetchTestcases,compileAndRunMultiple,EvaluateSubmission);
router.route('/recentSubmission').get(verifyJWT,getMostRecentSubmission,getTaskName);
router.route('/heatmap').get(verifyJWT,getHeatMapData);
router.route('/testingApi').post(getConstraints,(req,res)=>{res.status(200).json(req.body)});
export default router;

import {Router} from 'express';
const router= Router();
import { verifyJWT } from '../middlewares/authorization.js';

import {createTask, getAllTasks, getTask, updateTask, deleteTask} from '../controllers/tasks.controller.js';
import { deleteAllTestcases } from '../controllers/testcases.controller.js';
import { deleteSubmission } from '../controllers/submissions.controller.js';

router.route('/').get(verifyJWT,getAllTasks).post(verifyJWT,createTask);
router.route('/:_id').get(verifyJWT,getTask).put(verifyJWT,updateTask).delete(verifyJWT,deleteTask,deleteAllTestcases,deleteSubmission);

export default router;

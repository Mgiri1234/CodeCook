import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();

import {createTestcase, getTestcases, updateTestcase, deleteTestcase, fetchTestcases2, updateTestcasesOfProblem} from '../controllers/testcases.controller.js'

router.route('/').post(verifyJWT,createTestcase);
router.route('').get(getTestcases).put(verifyJWT,updateTestcasesOfProblem).delete(verifyJWT,deleteTestcase);
router.route('/fetchTestcases').post(fetchTestcases2);

export default router;
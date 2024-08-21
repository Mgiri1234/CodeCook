import {Router} from 'express';
const router= Router();
import { verifyJWT} from '../middlewares/authorization.js';
import {registerUser, loginUser,logoutUser, refreshAccessToken, getCurrentUser, getUserType, uploadProfilePhoto, resetPassword, forgotPassword, getAllUsers, toggleAdmin} from '../controllers/user.controller.js'
import {getUserStats} from '../controllers/submissions.controller.js'
import { upload } from '../utilities/cloudinary.js';

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//secure routes
router.route("/").get(verifyJWT,getAllUsers)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:userId/:token").post(resetPassword)
router.route("/isloggedin").post(verifyJWT,getUserType)
router.route("/getProfile").get(verifyJWT,getUserStats)
router.route("/update-image").put(verifyJWT,upload.single('image'),uploadProfilePhoto)
router.route("/toggle-admin/:userId").put(verifyJWT,toggleAdmin)


export default router;
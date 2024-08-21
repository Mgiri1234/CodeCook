import { User } from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Function to generate access and refresh tokens
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

// Function to register a user
const registerUser = asyncHandler(async (req, res) => {

    //take user details from frontend
    let { handle, fullName, email, password, dob } = req.body;

    // Validate fields
    if (!handle || !fullName || !email || !password || !dob) {
        throw new ApiError(400, "All fields are required");
    }

    // Validate email format
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    //check whether email exists in database
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    //create user in database
    const user = await User.create({
        handle,
        fullName,
        email,
        password,
        dob
    });

    //check whether user has been created or not
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    //return response
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User Registered Successfully"
        )
    );
});

// Function to login a user
const loginUser = asyncHandler(async (req, res) => {

    //take user details from frontend
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
        throw new ApiError(400, "password and email are required")
    }

    // Finding user in database
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Checking if password is correct

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password");
    }

    //const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    user.password = undefined;
    user.refreshToken = undefined;
    let { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user
                },
                "User logged In Successfully"
            )
        )
});

// Function to logout a user
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "User logged Out"))
})

// Function to refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        console.log(decodedToken);


        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

// Function to get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

// Function to get user type
const getUserType = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                isAdmin: req.user.isAdmin
            },
            "User type fetched successfully"
        ))
})

// Function to upload profile photo
const uploadProfilePhoto = asyncHandler(async (req, res) => {
    if (req.file) {
        const imageUrl = req.file.path;
        const userId = req.user._id;

        // Fetch the user
        const user = await User.findById(userId);

        // If user already has a photo, delete it from Cloudinary
        if (user.photo) {
            let publicId = user.photo.split('/').pop().split('.')[0];
            publicId = 'onlineJudge/' + publicId;
            console.log(publicId);
            await cloudinary.uploader.destroy(publicId);
        }

        // Update the photo field
        user.photo = imageUrl;

        // Save the user
        await user.save();

        res.json(new ApiResponse(
            200,
            { imageUrl },
            "Profile photo uploaded successfully"
        ));
    } else {
        throw new ApiError(400, "Please upload a file")
    }
})

// Function to send mail
const sendMail = asyncHandler(async (data) => {
    const { email, subject, text } = data;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: '"AlgoForcesTeam@noreply.com" <' + process.env.EMAIL + '>',
        to: email,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOptions, function (error, info) {  //using callback rather than promise for handling asynchronous code
        if (error) {
            //console.log(error);
            throw new ApiError(500, "Error sending email");
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json(new ApiResponse(200, {}, "Email sent successfully"));
        }
    });
})

// Function to send password reset link
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Please provide an email address")
    }

    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const resetToken = user.getResetPasswordToken();
    user.resetPasswordToken = resetToken;
    user.save({ validateBeforeSave: false });

    const toVisit = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}`;
    sendMail({ email, subject: "Password Reset", text: `Click on the link to reset your password: ${toVisit}` });
    res.json("Password reset link sent to your email");
});

// Function to reset password
const resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { userId, token } = req.params;

        if (!password) {
            throw new ApiError(400, "Please provide a password")
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
        if(decodedToken.id !== userId) {
            throw new ApiError(400, "Invalid token");
        }
        if (token !== user.resetPasswordToken) {
            throw new ApiError(400, "Invalid token");
        }

        user.password = password;
        user.resetPasswordToken = "";
        user.save();

        res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
};

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password -refreshToken -resetPasswordToken');
    res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
});

const toggleAdmin = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.status(200).json(new ApiResponse(200, {}, "User mode toggled successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    getUserType,
    uploadProfilePhoto,
    forgotPassword,
    resetPassword,
    getAllUsers,
    toggleAdmin
}
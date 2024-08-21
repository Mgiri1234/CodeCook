import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.js";

const verifyJWT = async(req,res, next) => {
    try {
        //console.log(req.cookies);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //console.log(token);
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //console.log(decodedToken);
        
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        next(new ApiError(401, error?.message || "Invalid access token"))
    }
}

export { verifyJWT };
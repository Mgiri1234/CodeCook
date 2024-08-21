import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    handle: {           //This is the user handle
      type: String,
      unique: true,
      trim: true,
      required: true,
      index: true
    },
    password: {
      type: String,
      required: [true,"password is required"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true 
    },
    dob: {
      type: Date
    },
    fullName:{
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: ""
    },
    resetPasswordToken: {
      type: String,
      default: ""
    }
  });
  
  userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken =function(){
    return jwt.sign(
      {
        id: this._id,
        isAdmin: this.isAdmin,
        handle: this.handle
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "4h"}
    )
}

userSchema.methods.generateRefreshToken =function(){
    return jwt.sign(
      {
        _id: this._id,
      }, 
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "10d"}
    )
}

userSchema.methods.getResetPasswordToken = function(){
  return jwt.sign(
    {id: this._id},
    process.env.RESET_PASSWORD_TOKEN_SECRET,
    {expiresIn: "5m"}
  )
}

export const User = mongoose.model("User", userSchema)
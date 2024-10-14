import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a username."],
        unique: true,
        lowercase: true,
        trim:true,
    },
    email: {
        type: String,
        required: [true, "Please Provide an email."],
        lowercase: true,
        unique: true,
        trim:true,
    },
    password: {
        type: String,
        required: [true, "Please Provide an Password."],
        trim:true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true });



export const User = mongoose.models.users || mongoose.model("users", userSchema);
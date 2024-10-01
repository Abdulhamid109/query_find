import mongoose from "mongoose";

const UserModal = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Please Provide an Unique Username"],
            unique:true
        },
        email:{
            type:String,
            required:[true,"Please Provide an Unique email"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"Please Provide an Password"],
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
    }
)

const User = mongoose.models.users || mongoose.model("users",UserModal)

export default User;
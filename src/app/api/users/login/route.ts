//here we will be creating an account

import User from "@/models/usermodal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"Account does not exists!!",status:400})
        }
        //password koh bcrypt karna hai
        const hashedPassword = await bcrypt.compare(password,user.password);
        if(!hashedPassword){
            return NextResponse.json({message:"Wrong Credentials",status:400})
        }

        //jwt set
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData,process.env.PRIVATE_KEY!,{expiresIn:"1d"});
        
        const responce =  NextResponse.json({message:"Successfully created the user",status:200})
        responce.cookies.set("token",token,{
            httpOnly: true, 
        })

        return responce;
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
//here we will be creating an account

import User from "@/models/usermodal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { connect } from "@/dbConfig/dbConfig";
connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message:"Account Already exists!!",status:400})
        }
        //password koh bcrypt karna hai
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // create an new user
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });


        const savedUser = await newUser.save();
        console.log(savedUser);
        //JWT set karna hai toh karlo
        
        return NextResponse.json({message:"Successfully created the user",status:200})
    } catch (error) {
        return NextResponse.json({
            error: String(error)
        }, { status: 500 })
    }
}
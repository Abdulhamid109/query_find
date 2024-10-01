import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';


export default function getDataFromToken(request:NextRequest){
    try {
        const token =  request.cookies.get("token")?.value||'';
        const TokenData = jwt.verify(token,process.env.PRIVATE_KEY!)as JwtPayload | string;
        return (TokenData as JwtPayload).id;
    } catch (error) {
        return NextResponse.json(
            {error:String(error)},
            {status:500}
        );
    }
}
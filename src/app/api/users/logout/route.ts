import { NextResponse } from "next/server";

export async function GET() {
    try {
        const responce = NextResponse.json({message:"Sucessfully LogOut!!",status:200});
        responce.cookies.set("token","", { httpOnly: true, expires: new Date(0)});
        return responce;
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
        
    }
}
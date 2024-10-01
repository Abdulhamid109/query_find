import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodal";
import getDataFromToken from "@/helpers/getDataFromToken";

connect();
export async function GET(request:NextRequest) {
    try {
        //unlock the token
        const id = await getDataFromToken(request);
        const user = await User.findOne({_id:id}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })

    } catch (error) {
        return NextResponse.json(
            {error:String(error)},
            {status:500}
        );
    }
}
import { generateToken } from "@/helpers/generateToken";

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.models";

// ----- To connect DB
connect();

export async function GET(request: NextRequest) {
    try {

        const userId = generateToken(request);

        const user = await User.findOne({ _id: userId }).select("-password");

        return NextResponse.json({
            message: "user found",
            userInfo: user
        }, { status: 200 });
    } catch (error: any) {
        console.log("User not found ::", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.models";
import { connect } from "@/dbConfig/dbConfig";
import { error } from "console";

// ----------To connect DB
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        console.log("This is user::", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Email verified Successfully.", success: true }, { status: 200 });

    } catch (error: any) {
        console.log("Error in verification::", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
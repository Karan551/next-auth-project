import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.models";

import { sendEmail } from "@/helpers/mailer";

// ---------To connect DB
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not Found.", success: false }, { status: 400 });
        }

        // send an email to user.
        await sendEmail({ emailType: "RESET", email, userId: user._id });



        return NextResponse.json({
            message: "Please Check Your Email.",
            status: 200,
            success: true,

        });


    } catch (error: any) {
        console.log("Forgot Password Error::", error.message);
        // throw new Error(error.message);
        return NextResponse.json({ message: "Reset Password Error." },
            { status: 500 });

    }

}
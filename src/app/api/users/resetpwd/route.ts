import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.models";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

// ----------To connect DB
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
      
        const { token, password } = reqBody;

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { password: hashedPassword });

        if (!updatedUser) {
            return NextResponse.json({ message: "Cannot Reset Password.", success: false },
                { status: 400 });
        }


        // To remove token in database.
        updatedUser.forgotPasswordToken = undefined;
        updatedUser.forgotPasswordTokenExpiry = undefined;


        await updatedUser.save();
        const response = NextResponse.json({ message: "Password Reset Successfully.", success: true },
            { status: 200 });
            
        // reset cookies 
        response.cookies?.set("token", "");

        return response;

    } catch (error: any) {
        console.log("Error in reset password verification::", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
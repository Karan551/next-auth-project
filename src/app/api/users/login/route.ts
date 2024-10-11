import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// To connect DB
connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
       
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User Does not exist." }, { status: 400 });
        }



        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Password Mismatch." }, { status: 400 });
        }
  

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // To generate a token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,

        });
        return response;
    } catch (error: any) {
        console.log("Login Error::", error.message);
        throw new Error(error.message);
    }

}



import { User } from "@/models/user.models";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";


// -----To connect DB
connect();


export async function Post(request: NextRequest) {
    try {
        const reqBody = await request.json();

        console.log(reqBody);

        const { username, email, password } = reqBody;

        // To check user is already exist or not
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exist." }, { status: 400 });
        }

        // hash password ?(doubt)
        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = bcryptjs.hash(password, salt);


        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        });


        const savedUser = await newUser.save();

        console.log("this is saved user::", savedUser);

        // send verification email
 
        sendEmail({ emailType: "VERIFY", email, userId: savedUser._id });


        return NextResponse.json({
            message: "User Created Succesfully.",
            status: 200,
            success: true,
            savedUser,

        });




    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
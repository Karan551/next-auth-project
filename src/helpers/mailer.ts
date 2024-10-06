import nodemailer from "nodemailer";
import { User } from "@/models/user.models";
import bcryptjs from "bcryptjs";



export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // to store db
        if (emailType = "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType = "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        // here we will work (using mail trap)
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // console.log("this is transporter", transporter);
        console.log("this is email user", process.env.EMAIL_PASSWORD, process.env.EMAIL_USER);
        const mailOptions = {
            from: "hitesh@gmail.com",
            to: email,
            subject: emailType == "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>
                Click 
<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> To ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
            or copy and paste the link below in your browser. <br/>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        };

        /*    const mailResponse = await transporter.sendMail(mailOptions); */


        const mailResponse = await transporter.sendMail({
            from: 'hitesh@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("this is mail response", mailResponse);
        console.log("Message sent", mailResponse.messageId);
        console.log("Message sent", mailResponse.messageId);
        console.log("Message sent", mailResponse.messageId);
        console.log("Message sent", mailResponse.messageId);
        return mailResponse;

    } catch (error: any) {
        console.log("Error in Mail Sending::", error);
        // throw new Error(error.message);
    }
};

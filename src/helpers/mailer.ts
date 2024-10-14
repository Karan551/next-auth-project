import nodemailer from "nodemailer";
import { User } from "@/models/user.models";
import bcryptjs from "bcryptjs";



export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        console.log("this email:",email,"and email Type ::",emailType)

        // Token store in database
        if (emailType === "VERIFY") {
            console.log("verify email verification")
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                });
        } else if (emailType === "RESET") {
            console.log("reset email verification")
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }


        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: "master@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>
                Click 
                <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ?`verifyemail`:"resetpwd"}?token=${hashedToken}">Here</a> To ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
            or copy and paste the link below in your browser. <br/>
            ${process.env.DOMAIN}/${emailType === "VERIFY" ?`verifyemail`:"resetpwd"}?token=${hashedToken}
            </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        console.log("this is mailresponse ----", mailResponse);
        
        return mailResponse;

    } catch (error: any) {
        console.log("Error in Mail Sending::", error);
        throw new Error(error.message);
    }
};

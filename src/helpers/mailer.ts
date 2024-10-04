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
              user: "113051571a5e50",
              pass: "********3f58"
            }
          });

        const mailOptions = {
            from: "master@gmail.com",
            to: email,
            subject: emailType == "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>
                Click 
<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> To ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
            or copy and paste the link below in your browser. <br/>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        console.log("Error::", error.message);
        throw new Error(error.message);
    }
};

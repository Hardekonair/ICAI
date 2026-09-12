import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendVerificationOTP = async (
    email,
    otp
) => {
    await transporter.sendMail({
        from: `"InterviewAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your InterviewAI verification code",

        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Email Verification</h2>

                <p>
                    Use the verification code below:
                </p>

                <h1 style="letter-spacing: 6px;">
                    ${otp}
                </h1>

                <p>
                    This code will expire in 10 minutes.
                </p>

                <p>
                    If you did not request this code,
                    you can safely ignore this email.
                </p>
            </div>
        `,
    });
};
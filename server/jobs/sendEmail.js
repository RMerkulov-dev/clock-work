import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function sendWelcomeEmail(recipientEmail, fullName) {
  try {
    // Transporter configuration
    let transporter = nodemailer.createTransport({
      host: "outlook.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Email configuration
    await transporter.sendMail({
      from: "clockworkactivity@outlook.com",
      to: recipientEmail,
      subject: "Welcome to Clockwork Activity",
      text: `Hello ${fullName}! Welcome to Clockwork Activity! Check your time and enjoy:).`,
    });
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

export { sendWelcomeEmail };

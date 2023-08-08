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
      subject: "Welcome to Clockwork App",
      html: `
        <p>Hi ${fullName}!</p>
        <p>Welcome to Clockwork Activity!</p>
        <p>This cool app was made to train my skills in the MERN stack, and I hope you enjoy it.</p>
        <p>To get to know me, go to my <a href="https://roman-merkulov-resume-2.netlify.app/">portfolio</a>.</p>
      `,
    });
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

export { sendWelcomeEmail };

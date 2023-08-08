import { workerData } from "worker_threads";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log(workerData.description);

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
    from: "clockworkactivity@outlook.com", // SENDER
    to: "fotoromario@gmail.com", // MULTIPLE RECEIVERS
    subject: "Hello ", // EMAIL SUBJECT
    text: "This is a test email.", // EMAIL BODY IN TEXT FORMAT
    html: "<b>This is a test email.</b>", // EMAIL BODY IN HTML FORMAT
  });
}

main().catch((err) => console.log(err));

import nodemailer from "nodemailer";
const secure = process.env.EMAIL_SECURE?.toLowerCase() === "true";

export const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_EMAIL_HOST,
  port: Number(process.env.NEXT_PUBLIC_EMAIL_PORT),
  secure: secure, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

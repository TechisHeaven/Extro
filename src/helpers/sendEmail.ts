import { Resend } from "resend";
import { CreateError } from "./createError";
import { HTTP_STATUS_CODES } from "@/constants/main.constants";
import { transporter } from "./nodeMailerTransporter";

interface sendMagicURLEmailProps {
  name: string;
  email: string;
  magicVerifyToken: string;
}
export async function sendMagicURLEmail({
  name,
  email,
  magicVerifyToken,
}: sendMagicURLEmailProps) {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_URL
    }/api/auth?v=${magicVerifyToken}&email=${encodeURIComponent(email)}`;

    const mailOptions = {
      from: {
        name: process.env.NEXT_PUBLIC_EMAIL_NAME!,
        address: process.env.NEXT_PUBLIC_EMAIL_USER!,
      },
      to: email,
      subject: "Welcome to Exto",
      text: "Login to your Extro Account",
      html: `<div>
            <h1>Welcome, ${name}!</h1>
            <p>click here to login to extro 😉 ${url}</p>
            </div>`,
    };

    const result = await transporter.sendMail(mailOptions);
    if (!result) {
      CreateError(
        HTTP_STATUS_CODES.clientErrors.Forbidden.status,
        "Failed to Send Email"
      );
      return Response.json({ error: "Failed to Send Email" }, { status: 500 });
    }

    return Response.json(result);
  } catch (error: unknown) {
    return Response.json({ error }, { status: 500 });
  }
}

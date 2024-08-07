import { EmailTemplate } from "@/template/email/email-template";
import { Resend } from "resend";
import { CreateError } from "./createError";
import { HttpStatusCode } from "axios";
import { HTTP_STATUS_CODES } from "@/constants/main.constants";
import { ResultError } from "@/types/types/types.error";
const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Exto",
      react: EmailTemplate({ firstName: name, magicURL: url }),
    });

    if (error) {
      CreateError(
        HTTP_STATUS_CODES.clientErrors.Forbidden.status,
        error.message
      );
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error: unknown) {
    return Response.json({ error }, { status: 500 });
  }
}

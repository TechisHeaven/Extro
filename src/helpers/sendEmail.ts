import { EmailTemplate } from "@/template/email/email-template";
import { Resend } from "resend";
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
    }/auth?v=${magicVerifyToken}&${encodeURIComponent(email)}`;
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Exto",
      react: EmailTemplate({ firstName: name, magicURL: url }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

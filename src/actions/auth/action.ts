"use server";
import { authSchema } from "./../../schemas/zod/auth/schema";
import {
  COOKIE_EXPIRE_TIME,
  HASH_EXPIRE_TIME,
  HTTP_STATUS_CODES,
} from "@/constants/main.constants";
import { prisma } from "@/helpers/client/prisma";
import { CreateError } from "@/helpers/createError";
import { createHash } from "@/helpers/handleHash";
import { ReturnResultProps } from "@/helpers/returnResult";
import { sendMagicURLEmail } from "@/helpers/sendEmail";
import { createCookieSession } from "@/helpers/session/handleCookies";
import { getSession } from "@/helpers/session/handleJWTsession";
import { AuthService } from "@/services/auth/auth";
import { ResultError } from "@/types/types/types.error";
import { UserInterface } from "@/types/types/types.user";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ZodIssue } from "zod";

const Auth = new AuthService();

export async function loginAction(
  state: { errors: { email?: string[]; success?: boolean } },
  formData: FormData
): Promise<{ errors: ZodIssue[] } | any> {
  try {
    const validatedFields = authSchema.safeParse({
      email: formData.get("email"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const email = validatedFields.data.email;
    if (!email) {
      return {
        errors: { email: ["Email is required"] },
      };
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      await createUser(email);
    } else {
      // TODO: Change is type and fix type error here.
      const magichash = await createHash(user.email, HASH_EXPIRE_TIME);

      // Email properties
      const emailProps = {
        name: user.name || "User", // Use a default name if none is provided
        email: user.email,
        magicVerifyToken: magichash.hash!,
      };

      const result = await sendMagicURLEmail(emailProps);

      if (!result || result.status !== 200) {
        return {
          errors: "Failed to Send Email",
        };
      }

      // Update user with magicToken and magicTokenExpires
      await prisma.user.update({
        where: { id: user.id },
        data: {
          magicToken: magichash.hash,
          magicTokenExpires: new Date(magichash.expirationTimestamp),
        },
      });

      return ReturnResultProps(200, "Email Send Successfully");
    }
  } catch (error: unknown) {
    if (error instanceof ResultError) {
      CreateError(error.statusCode, error.message);
    }
    CreateError(500, error as any);
    console.log(error);
  }
}
export async function loginGoogleAction(data: UserInterface) {
  try {
    const sessionToken = await createCookieSession(COOKIE_EXPIRE_TIME, data);
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}

export async function createUser(email: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
      },
    });

    if (!newUser) {
      CreateError(
        HTTP_STATUS_CODES.clientErrors.ExpectationFailed.status,
        "Failed to Create User"
      );
    }

    // Create the session hash and send email
    const magichash = await createHash(newUser.email, HASH_EXPIRE_TIME);
    // Email properties
    const emailProps = {
      name: newUser.name || "User", // Replace with actual user name if available
      email: newUser.email,
      magicVerifyToken: magichash.hash!,
    };

    const result = await sendMagicURLEmail(emailProps);

    if (!result || result.status !== 200) {
      return {
        errors: "Failed to Send Email",
      };
    }

    // Update the user with magicToken and magicTokenExpires
    await prisma.user.update({
      where: { id: newUser.id },
      data: {
        magicToken: magichash.hash,
        magicTokenExpires: new Date(magichash.expirationTimestamp),
      },
    });

    return ReturnResultProps(200, "Email Send Successfully");
  } catch (error: unknown) {
    if (error instanceof ResultError) {
      CreateError(error.statusCode, error.message);
    }
    console.log(error);
  }
}

//logout session
export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

interface UserInitialState {
  name: string;
  about_me: string;
}
// Update User
export async function updateUser(
  form: UserInitialState
): Promise<{ errors: ZodIssue[] } | any> {
  try {
    // Retrieve session and user ID
    const session = await getSession();
    const id = session.payload.id;

    // Extract form data
    // const name = form.get("name") as string;
    // const about_me = form.get("about_me") as string;
    const name = form?.name;
    const about_me = form?.about_me;
    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: name,
        about_me: about_me,
      },
    });

    // Return success response
    return {
      status: 200,
      message: "User Updated Successfully",
      result: updatedUser,
    };
  } catch (error) {
    // Handle errors
    if (error instanceof ResultError) {
      CreateError(error.statusCode, error.message);
    } else {
      console.error(error);
      CreateError(500, "Internal Server Error");
    }
    return {
      status: 500,
      error: "Internal Server Error",
    };
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
}

export async function getUser() {
  const session = await getSession();
  try {
    if (!session) {
      CreateError(
        HTTP_STATUS_CODES.clientErrors.NotFound.status,
        "Session not found"
      );
      return;
    }
    const userSession = session.payload.email;
    const result = await prisma.user.findUnique({
      where: {
        email: userSession?.email,
      },
      select: {
        id: true,
      },
    });
    const userId = result?.id;

    if (!userId) {
      CreateError(
        HTTP_STATUS_CODES.clientErrors.NotFound.status,
        "Session not found"
      );
    }
    const user = await Auth.getUser(userId!);

    return user;
  } catch (error) {
    if (error instanceof ResultError) {
      CreateError(error.statusCode, error.message);
    }
    console.log(error);
  }
}

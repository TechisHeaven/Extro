"use server";
import { authSchema } from "./../../schemas/zod/auth/schema";
import { notion } from "@/config/notion.config";
import { authDatabaseId } from "@/constants/database.constants";
import {
  COOKIE_EXPIRE_TIME,
  HASH_EXPIRE_TIME,
  HTTP_STATUS_CODES,
} from "@/constants/main.constants";
import { CreateError } from "@/helpers/createError";
import { createHash } from "@/helpers/handleHash";
import { ReturnResultProps } from "@/helpers/returnResult";
import { sendMagicURLEmail } from "@/helpers/sendEmail";
import { createCookieSession } from "@/helpers/session/handleCookies";
import { decrypt } from "@/helpers/session/handleJWTsession";
import { ResultError } from "@/types/types/types.error";
import { cookies } from "next/headers";
import type { ZodIssue } from "zod";

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
    const response = await notion.databases.query({
      database_id: authDatabaseId,
      filter: {
        property: "email",
        rich_text: {
          equals: email,
        },
      },
    });

    if (!response.results[0]) {
      await createUser(email);
    }

    // TODO: Change is type and fix type error here.
    const userResponse = response.results[0] as any;
    const user = {
      id: userResponse.id,
      name: userResponse?.properties.name.title,
      email: userResponse?.properties.email.email,
    };

    // Create the session and send email
    // Save the session in a cookie
    // const sessionToken = await createCookieSession(COOKIE_EXPIRE_TIME, user);

    const magichash = await createHash(user.email, HASH_EXPIRE_TIME);

    // email props
    const emailProps = {
      name: user.name,
      email: user.email,
      magicVerifyToken: magichash.hash!,
    };
    await sendMagicURLEmail(emailProps);

    await notion.pages.update({
      page_id: userResponse.id,
      properties: {
        magicToken: {
          rich_text: [
            {
              text: {
                content: magichash.hash,
              },
            },
          ],
        },
        magicTokenExpires: {
          rich_text: [
            {
              text: {
                content: magichash.hash,
              },
            },
          ],
        },
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

export async function createUser(email: string) {
  try {
    const properties = {
      email: {
        email: email,
      },
      sessionToken: {
        rich_text: [
          {
            text: {
              content: "example@example.com",
            },
          },
        ],
      },
      magicToken: {
        rich_text: [
          {
            text: {
              content: "example@example.com",
            },
          },
        ],
      },
      magicTokenExpires: {
        rich_text: [
          {
            text: {
              content: "example@example.com",
            },
          },
        ],
      },
    };

    const response = (await notion.pages.create({
      parent: {
        database_id: authDatabaseId,
      },
      properties: properties, // This object should follow the structure defined in your Notion database schema
    })) as any;

    if (!response) {
      CreateError(
        HTTP_STATUS_CODES.clientErrors.ExpectationFailed.status,
        "Failed to Create User"
      );
    }

    const user = {
      id: response?.id,
      name: response?.properties.name.title,
      email: response?.properties.email.email,
    };

    // Create the session and send email
    // Save the session in a cookie
    // const sessionToken = await createCookieSession(COOKIE_EXPIRE_TIME, user);

    const magichash = await createHash(user.email, HASH_EXPIRE_TIME);
    //email props
    const emailProps = {
      name: user.name,
      email: user.email,
      magicVerifyToken: magichash.hash!,
    };
    await sendMagicURLEmail(emailProps);

    await notion.pages.update({
      page_id: user.id,
      properties: {
        magicToken: {
          rich_text: [
            {
              text: {
                content: magichash.hash,
              },
            },
          ],
        },
        magicTokenExpires: {
          rich_text: [
            {
              text: {
                content: magichash.hash,
              },
            },
          ],
        },
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

//get session by cookies
export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

//logout session
export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

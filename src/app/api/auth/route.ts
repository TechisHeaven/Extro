import { COOKIE_EXPIRE_TIME } from "./../../../constants/main.constants";
import { CreateError } from "../../../helpers/createError";
import { NextRequest, NextResponse } from "next/server";
import { verifyHash } from "@/helpers/handleHash";
import { createCookieSession } from "@/helpers/session/handleCookies";
import { notion } from "@/config/notion.config";
import { authDatabaseId } from "@/constants/database.constants";
import { DatabaseResponseType } from "@/types/types/types.notion";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const verificationHash = searchParams.get("v");
    const email = searchParams.get("email");

    if (!verificationHash || !email) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("error", "Invalid URL");
      return NextResponse.redirect(redirectUrl);
    }
    if (verificationHash && email) {
      const hashVerified = (await verifyHash(email, verificationHash)) as any;
      if (!hashVerified && hashVerified.status !== 200) {
        if (hashVerified?.status === 401) {
          const redirectUrl = new URL("/login", request.url);
          redirectUrl.searchParams.set("error", "URL Expired");
          return NextResponse.redirect(redirectUrl);
        }

        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("error", "Failed to login");
        return NextResponse.redirect(redirectUrl);
      }

      let result = await notion.databases.query({
        database_id: authDatabaseId,
        filter: {
          property: "email",
          email: {
            equals: email,
          },
        },
      });
      const response = result.results[0] as DatabaseResponseType;
      const user = {
        id: result.results[0].id,
        name: response?.properties.name.title,
        email: response?.properties.email.email,
      };

      // Save the session in a cookie
      const sessionToken = await createCookieSession(COOKIE_EXPIRE_TIME, user);
      await notion.pages.update({
        page_id: user.id,
        properties: {
          sessionToken: {
            rich_text: [
              {
                text: {
                  content: sessionToken,
                },
              },
            ],
          },
          magicToken: {
            rich_text: [
              {
                text: {
                  content: "",
                },
              },
            ],
          },
          magicTokenExpires: {
            rich_text: [
              {
                text: {
                  content: "",
                },
              },
            ],
          },
        },
      });

      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("success", "Login Successfully");
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error: any) {
    CreateError(error.status, error.message);
  }
}

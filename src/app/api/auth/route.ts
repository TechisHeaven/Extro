import { COOKIE_EXPIRE_TIME } from "./../../../constants/main.constants";
import { CreateError } from "../../../helpers/createError";
import { NextRequest, NextResponse } from "next/server";
import { verifyHash } from "@/helpers/handleHash";
import { createCookieSession } from "@/helpers/session/handleCookies";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const verificationHash = searchParams.get("v");
  const email = searchParams.get("email");

  try {
    if (!verificationHash || !email) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("error", "Invalid URL");
      return NextResponse.redirect(redirectUrl);
    }

    if (verificationHash && email) {
      const hashVerified = await verifyHash(email, verificationHash);

      if (!hashVerified?.result && hashVerified?.status !== 200) {
        const redirectUrl = new URL("/login", request.url);
        const errorMsg =
          hashVerified?.status === 401 ? "URL Expired" : "Failed to login";
        redirectUrl.searchParams.set("error", errorMsg);
        return NextResponse.redirect(redirectUrl);
      }

      // Query user from the database
      const user = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!user) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("error", "User not found");
        return NextResponse.redirect(redirectUrl);
      }

      const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      // Save the session in a cookie
      const sessionToken = await createCookieSession(
        COOKIE_EXPIRE_TIME,
        jwtPayload
      );
      await prisma.user.update({
        where: { id: user.id },
        data: {
          sessionToken: sessionToken,
          magicToken: "", // Assuming empty string or adjust as necessary
          magicTokenExpires: null, // Assuming null or adjust as necessary
        },
      });

      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("success", "Login Successfully");
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error: any) {
    CreateError(error.status || 500, error.message || "Internal Server Error");
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
}

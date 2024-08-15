import {
  HASH_EXPIRE_TIME,
  HTTP_STATUS_CODES,
} from "@/constants/main.constants";
import crypto from "node:crypto";
import { CreateError } from "./createError";
import { notion } from "@/config/notion.config";
import { authDatabaseId } from "@/constants/database.constants";
import { prisma } from "./client/prisma";

export async function createHash(
  email: string,
  expirationInMinutes: number
): Promise<{ hash: string; expirationTimestamp: number }> {
  try {
    const secret = "thisismyhashsecret" + email;
    const hash = await crypto.createHash("md5").update(secret).digest("hex");

    // Store the hash with the expiration timestamp
    const expirationTimestamp = Date.now() + expirationInMinutes * 60 * 1000; // expiration time in milliseconds
    return { hash, expirationTimestamp };
  } catch (error) {
    console.log(error);
    throw error; // Ensure errors are handled properly
  }
}

// Function to verify the hash
export async function verifyHash(email: string, hash: string) {
  try {
    // Fetch the user and their token information from the database
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        magicToken: true,
        magicTokenExpires: true,
      },
    });

    // Check if user or necessary fields are missing
    if (!user || !user.magicToken || !user.magicTokenExpires) {
      CreateError(401, "Session not found");
    } else {
      // Check if the token has expired
      const currentTimestamp = Date.now();
      if (currentTimestamp > user.magicTokenExpires.getTime()) {
        CreateError(401, "Hash has expired");
      }

      // Validate the hash
      return {
        status: HTTP_STATUS_CODES.success.OK.status,
        result: hash === user.magicToken,
        message: "User Verified",
      };
    }
  } catch (error: any) {
    // CreateError(error.status, error.message);
    console.log(error);
    if (error) {
      return {
        status: error.status,
        result: false,
        message: error.message,
      };
    }
  }
}

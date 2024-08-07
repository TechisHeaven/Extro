import { HASH_EXPIRE_TIME } from "@/constants/main.constants";
import crypto from "node:crypto";
import { CreateError } from "./createError";
import { notion } from "@/config/notion.config";
import { authDatabaseId } from "@/constants/database.constants";

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
    const currentTimestamp = Date.now();
    const expirationTimestamp = Date.now() + HASH_EXPIRE_TIME * 60 * 1000;
    if (currentTimestamp > expirationTimestamp) {
      CreateError(401, "Hash has expired");
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

    const userResponse = response.results[0] as any;
    const computedHash =
      userResponse?.properties.magicToken.rich_text[0].plain_text;
    if (!computedHash) {
      CreateError(401, "Session not found");
    }

    return hash === computedHash;
  } catch (error: any) {
    // CreateError(error.status, error.message);
    console.log(error);
    if (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}

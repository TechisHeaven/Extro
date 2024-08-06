import { HASH_EXPIRE_TIME } from "@/constants/main.constants";
import crypto from "node:crypto";
import { CreateError } from "./createError";

export async function createHash(email: string, expirationInMinutes: number) {
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

    const computedHash = await createHash(email, HASH_EXPIRE_TIME);
    return hash === computedHash.hash;
  } catch (error: any) {
    // CreateError(error.status, error.message);
    if (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}

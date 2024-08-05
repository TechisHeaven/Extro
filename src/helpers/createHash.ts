import crypto from "node:crypto";

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
export function verifyHash(
  email: string,
  hash: string,
  expirationTimestamp: number
) {
  try {
    const currentTimestamp = Date.now();
    if (currentTimestamp > expirationTimestamp) {
      return { valid: false, message: "Hash has expired" };
    }

    const secret = "thisismyhashsecret" + email;
    const computedHash = crypto.createHash("md5").update(secret).digest("hex");

    return {
      valid: hash === computedHash,
      message: hash === computedHash ? true : false,
    };
  } catch (error) {
    console.log(error);
    return { valid: false, message: "Verification failed" };
  }
}

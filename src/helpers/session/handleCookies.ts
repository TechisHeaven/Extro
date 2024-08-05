import { cookies } from "next/headers";
import { encrypt } from "./handleJWTsession";

export async function createCookie(
  timeInSeconds: number = 10,
  name: string,
  payload: string,
  httpOnly: boolean = true
) {
  const session = payload;
  const expires = new Date(Date.now() + timeInSeconds * 1000);
  cookies().set(name, session, { expires, httpOnly: httpOnly });
}

export async function createCookieSession<T>(
  timeInSeconds: number = 10,
  payload: T,
  httpOnly: boolean = true
) {
  // Create the session
  const expires = new Date(Date.now() + timeInSeconds * 1000);
  const session = await encrypt({ payload, expires });
  cookies().set("session", session, {
    expires: expires,
    httpOnly: httpOnly,
  });

  return session;
}

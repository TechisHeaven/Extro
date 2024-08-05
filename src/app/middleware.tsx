import { updateSession } from "@/helpers/session/handleJWTsession";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

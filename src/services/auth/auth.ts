import { prisma } from "@/helpers/client/prisma";
import { CreateError } from "@/helpers/createError";
import { decrypt } from "@/helpers/session/handleJWTsession";
import { ResultError } from "@/types/types/types.error";
import { cookies } from "next/headers";

export class AuthService {
  async getUser(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          about_me: true,
          created_at: true,
          updated_at: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof ResultError) {
        CreateError(error.statusCode, error.message);
      }
      console.log(error);
    }
  }
}

import { prisma } from "@/helpers/client/prisma";
import { CreateError } from "@/helpers/createError";
import { ResultError } from "@/types/types/types.error";
import { getServerSession } from "next-auth";

export class AuthService {
  async getUser(id: number) {
    const user = await getServerSession();
    try {
      console.log({ id });
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
      console.log({ error });
    }
  }
}

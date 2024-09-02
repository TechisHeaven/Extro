import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateError } from "@/helpers/createError";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  const session = await getServerSession();
  try {
    // const id = params.id;
    // if (!id) throw CreateError(404, "id not Found");
    if (!session) throw CreateError(404, "Session Id not Found");
    const email = session?.user?.email;
    if (!email) throw CreateError(404, "User not Found");
    const userResult = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        CurrentExpenses: true,
      },
    });

    return Response.json({
      success: true,
      message: "Current Expense Fetch Successfully",
      result: userResult?.CurrentExpenses,
    });
  } catch (error: any) {
    CreateError(error.status || 500, error.message || "Internal Server Error");
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
}

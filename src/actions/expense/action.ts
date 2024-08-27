"use server";

import { ExpenseType } from "@/components/ui/Expense/AddExpenseComponents";
import { prisma } from "@/helpers/client/prisma";
import { TableDataResultProps } from "@/types/types/types.main";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

export async function getExpenses(): Promise<{
  result?: TableDataResultProps[] | any;
  error: boolean;
  message: string;
  status: number;
}> {
  try {
    const userSession = await getServerSession();
    if (!userSession) {
      return { error: true, message: "User session not found", status: 401 };
    }
    const userEmail = userSession?.user?.email;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail!,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return { error: true, message: "User session not found", status: 401 };
    }
    const userId = user.id;
    const result = await prisma.expense.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      error: false,
      message: "Expenses Fetch Successfully",
      result: result,
      status: 200,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.message ? error.message : error,
      status: error.status ? error.status : 500,
    };
  }
}

export async function createExpense(form: ExpenseType, userId: number) {
  try {
    if (!form) {
      return { error: true, message: "Value must be provided", status: 404 };
    }
    if (!userId) {
      return { error: true, message: "User not found", status: 401 };
    }

    const price = Number(form.price);
    await prisma.expense.create({
      data: {
        title: form.title,
        price: price,
        category: form.category,
        type: form.type,
        images: form?.images || [],
        userId: userId,
        expenseTime: form?.expenseTime?.toISOString(),
      },
    });

    revalidatePath("/", "page");
    revalidatePath("/", "layout");
    return {
      error: false,
      message: "Expense Created Successfully",
      status: 201,
    };
  } catch (error: any) {
    return { error: true, message: error, status: error.status || 500 };
  }
}

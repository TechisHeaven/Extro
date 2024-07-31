import { Transaction } from "@/types/types/types.main";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  await new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });
  const data: Transaction[] = [
    {
      id: "m5gr84i9",
      amount: 326,
      status: "success",
      timestamp: new Date().getTime(),
      name: "Butter Delight Biscuit",
      category: "snacks",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      timestamp: new Date().getTime(),
      name: "Butter Delight Biscuit",
      category: "groceries",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      timestamp: 1721700268811,
      name: "Butter Delight Biscuit",
      category: "groceries",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      timestamp: 1721154600,
      name: "Butter Delight Biscuit",
      category: "groceries",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      timestamp: Date.now(),
      name: "cButter Delight Biscuit",
      category: "groceries",
    },
  ];

  return NextResponse.json(
    {
      message: "Successfullly Fetched Expneses",
      success: true,
      data,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

import { getExpenses } from "@/actions/expense/action";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  // await new Promise(function (resolve) {
  //   setTimeout(resolve, 1000);
  // });
  const result = await getExpenses();

  return NextResponse.json(
    {
      message: "Successfullly Fetched Expneses",
      success: true,
      data: result,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

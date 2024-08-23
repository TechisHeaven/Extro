// "use server";
import axios from "axios";

export async function fetchAll(): Promise<any> {
  try {
    let response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/expense`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
    });

    const result = await response.json();
    return result.data.result;
  } catch (error: any) {
    if (error.cause instanceof AggregateError) {
      console.error(error.cause.errors);
    } else if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.log("error", error);
    }
  }
}

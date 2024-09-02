import axios from "axios";

export async function getCurrentExpense() {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/auth/current`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      }
    );

    const result = await response.json();
    return result.result;
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

// "use server";
import axios from "axios";

export async function fetchAll() {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/expense`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    if (error.cause instanceof AggregateError) {
      console.error(error.cause.errors);
    } else {
      console.log("error", error);
    }

    // return error;
  }
}

export async function fetchDummy() {
  try {
    const response = await axios.get("https://dummyjson.com/products/1", {
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

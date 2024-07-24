export async function fetchAll() {
  try {
    let response = await fetch("http://localhost:3000/api/expense", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-cache",
    });

    let result = (await response.json()) as {
      message: string;
      success: boolean;
      data: any;
    };
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

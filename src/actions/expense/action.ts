"use server";

import { notion } from "@/config/notion.config";
import { authDatabaseId } from "@/constants/database.constants";

export async function getBlogPosts() {
  const response = await notion.databases.query({
    database_id: authDatabaseId,
  });
  return response.results;
}

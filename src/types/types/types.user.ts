import { CurrentExpenses } from "@prisma/client";

export interface UserInterface {
  id?: string | number;
  name: string | null;
  about_me?: string | null;
  email?: string;
  image?: string | null;
  CurrentExpenses?: CurrentExpenses | null;
}

export interface ReturnUserResult {
  id: string;
  properties: {
    name: {
      title: [
        {
          plain_text: string;
        }
      ];
    };
    email: {
      email: string;
    };
    about_me: {
      rich_text: [
        {
          plain_text: string;
        }
      ];
    };
    createdAt: {
      created_time: string;
    };
    updatedAt: {
      last_edited_time: string;
    };
  };
}

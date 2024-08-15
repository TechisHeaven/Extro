"use client";

import { getUser } from "@/actions/auth/action";
import useUserStore, { UserState } from "@/store/user.store";

import React, { createContext, useContext, useEffect } from "react";

const UserContext = createContext<UserState | undefined>(undefined);

export function UserStoreProvider({ children }: { children: React.ReactNode }) {
  const user = useUserStore() as UserState;

  const { setUser } = user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [setUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

// export async function reloadCurrentUser() {
//   try {
//     const { setUser } = useUserContext();
//     const session = await getSession();
//     const pageId = session.payload.id;

//     const user: ReturnUserResult = await notion.pages.retrieve({
//       page_id: pageId,
//     });

//     const result = {
//       id: user.id,
//       name: user.properties.name.title[0].plain_text,
//       email: user.properties.email.email,
//       about_me: user.properties.about_me.rich_text[0].plain_text,
//       createdAt: user.properties.createdAt.created_time,
//       updatedAt: user.properties.updatedAt.last_edited_time,
//     };
//     setUser(result);
//     // return result;
//   } catch (error) {
//     if (error instanceof ResultError) {
//       CreateError(error.statusCode, error.message);
//     }
//     console.log(error);
//   }
// }

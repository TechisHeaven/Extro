// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { NextAuthOptions, Session } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "../client/prisma";
// import { JWT } from "next-auth/jwt";
// import { AdapterUser } from "next-auth/adapters";

// // const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//   // Secret for Next-auth, without this JWT encryption/decryption won't work
//   secret: process.env.NEXT_AUTH_SECRET,
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string,
//     }),
//   ],
//   session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
//   jwt: {
//     secret: process.env.NEXT_AUTH_SECRET,
//     maxAge: 60 * 60 * 24 * 30,
//   },
//   adapter: PrismaAdapter(prisma),
//   callbacks: {
//     // async jwt({ token, account, user, profile, session }) {
//     //   // Persist the OAuth access_token to the token right after signin
//     //   console.log({ token, account, user, profile, session });
//     //   if (account) {
//     //     token.accessToken = account.access_token;
//     //   }
//     //   return await token;
//     // },
//     async jwt({ token, account, profile }) {
//       // console.log("JWT Callback:", { token, account, profile });

//       if (account) {
//         token.accessToken = account.access_token;
//       }

//       if (profile) {
//         token.id = profile.sub;
//         token.name = profile.name;
//         token.email = profile.email;
//         token.image = profile.picture;
//         token.emailVerified = profile.email_verified || null;
//       }

//       console.log("JWT Callback:", { token, account, profile });

//       return token;
//     },

//     async session({ session, token }) {
//       // console.log("Session Callback:", { session, token });

//       if (token) {
//         session.user = {
//           id: token.id as string,
//           name: token.name as string,
//           email: token.email as string,
//           image: token.image as string,
//         };
//         session.accessToken = token.accessToken as string;
//       }

//       console.log("Session Callback:", { session, token });
//       return session;
//     },

//     // async session({ session, token, user }) {
//     //   console.log("session", { session, token, user });
//     //   if (user) {
//     //     session.user.id = user.id;
//     //   }
//     //   // Send properties to the client, like an access_token from a provider.
//     //   if (token) {
//     //     session.accessToken = token.accessToken as string;
//     //   }
//     //   return await session;
//     // },
//   },
// };

// interface AuthSession extends Session {
//   user: {
//     id: string | number;
//     name: string;
//     email: string;
//     image: string;
//   };
//   accessToken?: string;
//   expires: string;
// }

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../client/prisma";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};

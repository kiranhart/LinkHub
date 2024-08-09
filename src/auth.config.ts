import Discord from "next-auth/providers/discord"
import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from "next-auth"
import { env } from "process";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Discord, 
    Google
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
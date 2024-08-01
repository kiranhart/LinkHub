import Discord from "next-auth/providers/discord"
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Discord],
  callbacks: {
    jwt({ token, user }) {
        if (user) { // User is available during sign-in
          token.id = user.id
        }
        return token
      },
  }
} satisfies NextAuthConfig
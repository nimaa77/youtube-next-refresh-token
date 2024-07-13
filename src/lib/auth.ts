import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        // pass credentials to backend
        // and return user object

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // TODO: save access token to token

      return token;
    },
    session: async ({ session, token }) => {
      // TODO: get access token from token
      return session;
    },
  },
});

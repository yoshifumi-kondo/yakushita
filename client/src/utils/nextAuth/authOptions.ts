import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { UserAuth, GoogleAuth } from "@/api/lib/domain";
import { GoogleAuthId } from "@/api/lib/domain/user/auth/GoogleAuthId";
import { ENV_KEY, getEnvValue } from "@/utils/getEnv";
import { signInOrSignUp } from "@/api/feature/user/usecase/auth";

export const authOptions: AuthOptions = {
  secret: getEnvValue(ENV_KEY.NEXTAUTH_SECRET),
  providers: [
    GoogleProvider({
      clientId: getEnvValue(ENV_KEY.GOOGLE_CLIENT_ID),
      clientSecret: getEnvValue(ENV_KEY.GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const createdUser = await signInOrSignUp.execute(
            new UserAuth({ google: new GoogleAuth(new GoogleAuthId(user.id)) })
          );
          if (createdUser) {
            user.userId = createdUser.toJSON().id;
            return true;
          }
        }

        return false;
      } catch (e) {
        console.error(e);
        return Promise.reject(new Error("An error occurred during sign in."));
      }
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.userId = user.userId;
        }
        return token;
      } catch (e) {
        console.error(e);
        return Promise.reject(new Error("An error occurred during jwt."));
      }
    },
    async session({ session, token }) {
      try {
        session.userId = token.userId as string;
        return session;
      } catch (e) {
        console.error(e);
        return Promise.reject(new Error("An error occurred during session."));
      }
    },
  },
};

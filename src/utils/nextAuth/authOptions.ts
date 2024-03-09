import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SignInOrSignUpUsecase } from "@/api/usecase/auth/SingInOrSignUpUsecase";
import { UserAuth, GoogleAuth } from "@/api/lib/domain";
import { GoogleAuthId } from "@/api/lib/domain/user/auth/GoogleAuthId";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const createdUser = await SignInOrSignUpUsecase(
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
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        session.userId = token.userId as string;
        return session;
      } catch (e) {
        console.error(e);
        return session;
      }
    },
  },
};

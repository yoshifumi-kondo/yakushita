"use client";
import Component from "@/component/auth/SignIn";
import { SessionProvider } from "next-auth/react";

export default function PageWithSession() {
  return (
    <main className="w-screen h-screen flex-col flex justify-center items-center">
      <SessionProvider session={null}>
        <Component />
      </SessionProvider>
    </main>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "@/provider/NextAuthProvider";
import { authOptions } from "@/utils/nextAuth/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingua Tailor",
  description: "Translate languages and keep your history",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

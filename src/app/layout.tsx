import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryClientProvider from "@/providers/reactQueryProvider";
import { UserStoreProvider } from "@/providers/user.provider";
import NextAuthProvider from "@/providers/nextAuth.provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  // manifest: "/manifest.json",
  icons: "/favicon.ico",
  title: "Extro",
  description: "Extro Expense Tracker Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <ReactQueryClientProvider>
            <UserStoreProvider>{children}</UserStoreProvider>
          </ReactQueryClientProvider>
          <Toaster position="top-center" />
        </NextAuthProvider>
      </body>
    </html>
  );
}

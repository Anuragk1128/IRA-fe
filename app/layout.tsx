import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { AuthProvider } from "@/contexts/AuthContext"; // AuthProvider is now in ClientLayoutWrapper
import ClientLayoutWrapper from './ClientLayoutWrapper';

// These are loaded on the server
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IRA Jewelleries",
  description: "Home of Artificial Jewelleries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}



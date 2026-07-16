import LoadingScreen from "@/components/LoadingScreen";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Boldonse,
  Outfit,
  Mulish,
  Plus_Jakarta_Sans
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-boldonse"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Rezenate",
  description: "Lead The Way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${boldonse.variable} ${outfit.variable} ${mulish.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><LoadingScreen>{children}</LoadingScreen></body>
    </html>
  );
}

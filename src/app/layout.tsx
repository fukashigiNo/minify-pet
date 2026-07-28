import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "@/components/store/proividers";
import { SideBar } from "@/widgets/sidebar";
import { PlayerBar } from "@/widgets/bottom-player";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minify",
  description: "Minify for individual use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ReduxProvider>
        <body className="min-h-full flex flex-col">
          <div className="flex">
            <SideBar />

            {children}
          </div>

          <div className="relative">
            <PlayerBar />
          </div>
        </body>
      </ReduxProvider>
    </html>
  );
}

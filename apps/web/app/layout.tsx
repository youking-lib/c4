import type { Metadata } from "next";
import localFont from "next/font/local";
import { Theme } from "@radix-ui/themes";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Theme
          data-is-root-theme="false"
          data-has-background="false"
          accentColor="purple"
          grayColor="mauve"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}

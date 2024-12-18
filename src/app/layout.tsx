import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import PasswordDialog from "@/components/passwordDialog/PasswordDialog";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DevDocs",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div className="absolute inset-0 z-[-2] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        <nav className=" flex justify-between items-center w-full  pt-3 px-6">
          <Link href="/">
            <Image
              src={"/DevDocWhite.png"}
              alt={"LOGO"}
              width={50}
              height={50}
              priority
              blurDataURL="URL"
              placeholder="blur"
              className=" cursor-pointer mt-10px hover:bg-end hover:drop-shadow-[0_4px_15px_rgba(116,79,168,0.75)]"
            />
          </Link>

          <PasswordDialog />
        </nav>
        {children}
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import { TanstackProvider } from "@/providers/TanstackProvider";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Authly",
  description: "Authly is Authentication provider for your React App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <TanstackProvider>
          <main className="mx-auto min-h-screen max-w-[1400px] px-2">
            {children}
          </main>
        </TanstackProvider>
      </body>
    </html>
  );
}

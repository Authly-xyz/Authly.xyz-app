import "@/styles/globals.css";
import { TanstackProvider } from "@/providers/TanstackProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
    <html
      lang="en"
      className={`${geist.variable} bg-gray-50`}
      suppressHydrationWarning
    >
      <body>
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="max-screen">{children}</main>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

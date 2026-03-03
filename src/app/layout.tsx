import { ReactNode } from "react";
import type { Metadata } from "next";
import { Quantico, Outfit } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quantico",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo/otm-logo.png",
    apple: "/logo/otm-logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerStore = await headers();
  const locale = headerStore.get("x-locale") ?? "es";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${quantico.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

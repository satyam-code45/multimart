import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multimart",
  description:
    "Multimart is a modern platform for creators to sell digital products, manage orders, and get paid instantly. Built with Next.js, Payload CMS, and Stripe.",
  keywords: [
    "Multimart",
    "Sell digital products",
    "Digital downloads",
    "Gumroad alternative",
    "Next.js platform",
    "Payload CMS",
    "Stripe payments",
    "Creator tools",
    "E-commerce",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            <Toaster richColors />
            {children}
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

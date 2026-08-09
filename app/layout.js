import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/Providers/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Javid’s Café | Freshly Brewed Happiness",
  description: "Handcrafted coffee, cozy vibes, and delicious treats.",
  keywords: ["coffee", "cafe", "espresso", "latte", "Javid's Cafe"],
  authors: [{ name: "Javid’s Café" }],
  viewport: "width=device-width, initial-scale=1.0", // ✅ Added viewport
  openGraph: {
    title: "Javid’s Café",
    description: "Freshly brewed coffee and cozy vibes.",
    url: "https://yourwebsite.com",
    siteName: "Javid’s Café",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Javid’s Café Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Javid’s Café",
    description: "Freshly brewed coffee and cozy vibes.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

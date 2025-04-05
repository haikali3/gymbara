import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanstackProvider from "@/providers/tanstack-provider";
import { Toaster } from "@/components/ui/toaster";

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

// Satoshi
const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Italic.woff",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Gymbara - Your Ultimate Fitness Companion",
  description:
    "Transform your fitness journey with Gymbara, the ultimate platform for health and wellness. Discover personalized workout plans tailored to your goals, track your progress with ease, and join a vibrant community of fitness enthusiasts. Whether you're a beginner or a seasoned athlete, Gymbara provides the tools, motivation, and support you need to achieve your dream physique and lead a healthier, more active lifestyle. Start your transformation today with Gymbara!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* React Scan */}
      {/* <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head> */}
      <body
        // className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} antialiased`}
        className={`${satoshi.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <TanstackProvider>{children}</TanstackProvider>
        <Toaster />
      </body>
    </html>
  );
}

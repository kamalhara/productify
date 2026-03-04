import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Outfit, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Productify — Share & Discover Products",
  description:
    "Showcase your products, get feedback, and discover what others are building.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            href="https://fonts.cdnfonts.com/css/integral-cf"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${playfair.variable} antialiased min-h-screen`}
          style={{ backgroundColor: "#f2f2f2", color: "#000000" }}
          suppressHydrationWarning
        >
          <Navbar />
          <main>{children}</main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#000000",
                border: "1px solid #e5e5e5",
                borderRadius: "100px",
                fontSize: "14px",
                fontFamily: "var(--font-outfit), system-ui, sans-serif",
                padding: "10px 20px",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}

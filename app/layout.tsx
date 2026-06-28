import type { Metadata } from "next";
import { Permanent_Marker, Kalam, Caveat } from "next/font/google";
import "./globals.css";
import { SketchDefs } from "@/components/SketchDefs";
import { SoundProvider } from "@/components/SoundProvider";
import { profile } from "@/lib/data";
import { DotPattern } from "@/components/DotPattern";

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
  display: "swap",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${marker.variable} ${kalam.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen">
        <DotPattern />
        <SketchDefs />
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}

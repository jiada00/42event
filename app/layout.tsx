import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar"; 
import Footer from "@/components/Footer/footer";
import Image from 'next/image'; 
import Hero from "@/components/hero";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "活水活动",
  description: "在城市发现有趣的灵魂",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground bg-white text-black">
        <Navbar />       
        <main className="min-h-screen flex flex-col items-center">
          {children}       
        </main>
        <Footer/>
      </body>
    </html>
  );
}

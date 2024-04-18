import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Hero from "@/components/hero";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center">
        <Hero/> 
        {children}          
      </main>
    </div>
  );
}

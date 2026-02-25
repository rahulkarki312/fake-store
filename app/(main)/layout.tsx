import type { Metadata } from "next";
// import "./globals.css";
import Navbar from "@/components/shared/Navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <>
        <Navbar />
        {children}
      </>
    
  );
}
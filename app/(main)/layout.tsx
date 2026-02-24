import type { Metadata } from "next";
// import "./globals.css";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: {
    default: "E-commerce App",
    template: "%s | E-commerce App",
  },
  description: "An e-commerce dashboard built with Next.js",
};

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
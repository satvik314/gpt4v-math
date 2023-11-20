import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { ToasterProvider } from "./components/ToasterProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import Navbar from "./components/Navbar";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "GPT4V Math",
  description: "Check home work solutions using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
      <SupabaseProvider>
          <UserProvider>
            <Navbar />
            {children}
            <ToasterProvider />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

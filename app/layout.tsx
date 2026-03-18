import { Nunito, Arsenal } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar/SidebarContext";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import AnimatedBlobs from "@/components/AnimatedBlobs";

const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const arsenal = Arsenal({
  variable: "--font-arsenal-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pi Sandbox — PayIntelli",
  description: "Sandbox environment to learn the Pi platform. Cognitive-based auth can be added later.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${arsenal.variable} font-sans antialiased flex relative overflow-x-hidden min-h-screen bg-[#f0fdfa]`}
      >
        <AnimatedBlobs />
        <SidebarProvider>
          <Sidebar />
          <main className="flex-1 flex flex-col min-h-screen overflow-auto relative z-[1] bg-background/95">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}

import { Nunito, Arsenal } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar/SidebarContext";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import { SandboxAuthProvider } from "@/providers/SandboxAuthProvider";
import { AppChrome } from "@/components/AppChrome";

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
  description:
    "Sandbox environment to explore the Pi platform with Client Hub sign-in and product demos.",
  robots: "noindex, nofollow",
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
          <SandboxAuthProvider>
            <AppChrome>{children}</AppChrome>
          </SandboxAuthProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}

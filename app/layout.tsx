import type { Metadata } from "next";
import MirageSetup from "@/components/MirageSetup";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snapp! Shop",
  description: "next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MirageSetup>{children}</MirageSetup>
      </body>
    </html>
  );
}

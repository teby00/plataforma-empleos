import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turempleo",
  description:
    "Turempleo es la entidad encargada de la gestión, selección y capacitación del capital humano para el sector del turismo en Cuba. Nuestra plataforma funciona como el enlace oficial entre los aspirantes y las entidades hoteleras y extrahoteleras del MINTUR, facilitando el ingreso a la Reserva Laboral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

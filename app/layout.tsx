import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["400", "500"],
    variable: "--font-roboto",
    display: 'swap', //muestra una fuente del sistema mientras se carga la fuente personalizada
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Application for saving links",
    description: "save links and descriptions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>{children}</body>
        </html>
    );
}

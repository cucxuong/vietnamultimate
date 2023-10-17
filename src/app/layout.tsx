import "./globals.css";
import type { Metadata } from "next";
import { Inter, Bungee, Barlow } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const barlow = Barlow({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin", "vietnamese"] });
const bungee = Bungee({ weight: "400", subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
    title: "Vietnam Hat 2023",
    description: "Event by Vietnam Ultimate",
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={`grid-bg overscroll-none w-[100dvw] h-[100dvh] overflow-hidden ${barlow.className}`}>{children}</body>
        </html>
    );
}

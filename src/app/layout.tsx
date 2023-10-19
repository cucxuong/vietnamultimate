import MainLayout from "@/components/layouts/MainLayout";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin", "vietnamese"], variable:"--font-barlow" });

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
            <body className={`${barlow.variable}`}>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
}

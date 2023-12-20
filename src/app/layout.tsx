import MainLayout from "@/components/layouts/MainLayout";
import type { Metadata } from "next";
import { Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/components/UIs/Loading";

const barlow = Barlow({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin", "vietnamese"], variable: "--font-barlow" });
const jetbrainsMono = JetBrains_Mono({ weight: ["100", "200", "300", "400", "500", "600", "700", "800"], subsets: ["latin", "vietnamese"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
    title: "Vietnam Ultimate Frisbee",
    description: "A channel for Vietnam Ultimate Community",
    openGraph: {
        type: "website",
        url: "https://vietnam-ultimate.com",
        title: "Registration - Vietnam Hat 2023",
        description: "The biggest HAT of Vietnam is coming",
        images: "https://vietnam-ultimate.com/banner.png",
    },
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={`${barlow.variable} ${jetbrainsMono.variable} ${barlow.className} grid-bg`}>
                <Suspense fallback={<Loading />}>
                    <MainLayout>{children}</MainLayout>
                </Suspense>
            </body>
        </html>
    );
}

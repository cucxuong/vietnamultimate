import TournamentLayout from "@/components/layouts/TournamentLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vietnam Hat 2023",
    description: "The biggest HAT of Vietnam is coming",
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
    return <TournamentLayout>{children}</TournamentLayout>;
}

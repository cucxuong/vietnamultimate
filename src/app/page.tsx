import { Bungee, Bungee_Outline, Bungee_Inline } from "next/font/google";
import Link from "next/link";
const bungee = Bungee({ weight: "400", subsets: ["latin", "vietnamese"] });
const bungeeOutline = Bungee_Outline({ weight: "400", subsets: ["latin", "vietnamese"] });
const bungeeInline = Bungee_Inline({ weight: "400", subsets: ["latin", "vietnamese"] });

export default function Home() {
    return (
        <main className={`grid place-content-center gap-12 min-h-screen w-screen grid-bg`}>
            <h2 className={`text-5xl lg:text-7xl text-center ${bungeeOutline.className} dark:${bungeeInline.className}`}>
                Vietnam Hat <br />
                <span className={`text-2xl lg:text-4xl ${bungee.className}`}>
                    Dec 16<sup>th</sup>-17<sup>th</sup>, 2023
                </span>
            </h2>
            <div className="flex justify-center">
                <Link href={"./recruitment"} className="flex items-center h-14 px-8 rounded-md bg-[rgb(var(--foreground-rgb))] text-[rgb(var(--background-start-rgb))]">
                    Get started
                </Link>
            </div>
        </main>
    );
}

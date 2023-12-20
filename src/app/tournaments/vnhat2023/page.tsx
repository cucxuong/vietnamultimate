"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        document.querySelector("body")?.classList.remove("dark");
    });

    const [delay, setDelay] = useState(false);
    const [team, setTeam] = useState("");
    const tabs = () => [
        {
            name: "Group Stage",
            content: (
                <div className={`grid`}>
                    <h3 className="text-lg font-medium">Round Robin</h3>
                </div>
            ),
        },
        {
            name: "Final Stage",
            content: (
                <div className={`grid`}>
                    <h3 className="text-lg font-medium">Knock-Out</h3>
                    <h3 className="text-lg font-medium">Semi B</h3>
                    <h3 className="text-lg font-medium">Semi A</h3>
                    <h3 className="text-lg font-medium">Final B</h3>
                    <h3 className="text-lg font-medium">Final A</h3>
                </div>
            ),
        },
        {
            name: "Teams list",
            content: (
                <div className="grid gap-4">
                    <div className="rounded-2xl border bg-white cursor-pointer relative grid p-4" onClick={() => setTeam((t) => (t === "Penguin" ? "" : "Penguin"))}>
                        <div className="flex items-center gap-4">
                            <div className="grid place-content-center rounded-full w-12 aspect-square">
                                <Image src={"/Penguin.png"} alt="" width={100} height={100} className="w-full h-full object-cover" />
                            </div>
                            <span className="uppercase font-semibold">Penguin</span>
                            <div className="w-full flex font-medium justify-center gap-4">
                                <div className="grid font-medium">
                                    <span className="text-xs">Scores</span>
                                    <span>2</span>
                                </div>
                                <div className="grid font-medium">
                                    <span className="text-xs">Assists</span>
                                    <span>2</span>
                                </div>
                            </div>

                            <span className="ml-auto">
                                <Button size={"icon-sm"} variant={"ghost"} className="rounded-full">
                                    <div className="absolute inset-0"></div>
                                    <Maximize2 size={18} />
                                </Button>
                            </span>
                        </div>
                        <div className={`grid transition-all ${team === "Penguin" ? "grid-rows-[minmax(0,1fr)] p-4" : "grid-rows-[minmax(0,0fr)] overflow-hidden"}`}></div>
                    </div>
                </div>
            ),
        },
    ];
    const [tab, setTab] = useState(tabs()[0]);
    const changeTab = (v: typeof tab) => {
        setDelay(true);
        setTimeout(() => {
            setDelay(false);
            setTab(v);
        }, 300);
    };

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <div className="grid grid-rows-[auto_minmax(0,1fr)] max-w-screen-xl w-full mx-auto gap-6 xl:gap-8 p-6 xl:p-8">
                <Button variant={"ghost"} className="justify-start gap-2 pl-2 -ml-2 mr-auto" onClick={() => router.push("/tournaments")}>
                    <ChevronLeft size={24} strokeWidth={3} />
                    <h2 className="text-3xl xl:text-4xl font-semibold uppercase -mt-1">Vietnam HAT 2023</h2>
                </Button>

                <div className="flex flex-col gap-4">
                    <div className="flex rounded-full divide-x border overflow-hidden">
                        {tabs().map((t) => (
                            <Button
                                key={t.name}
                                size={"sm"}
                                variant={t.name === tab.name ? "default" : "ghost"}
                                className="w-full rounded-none uppercase font-semibold max-xl:text-xs"
                                onClick={() => changeTab(t)}
                            >
                                {t.name}
                            </Button>
                        ))}
                    </div>
                    <div className={`transition-all duration-300 ${delay ? "translate-y-16 opacity-0" : ""}`}>{tab.content || tab.name}</div>
                </div>
            </div>
        </section>
    );
}

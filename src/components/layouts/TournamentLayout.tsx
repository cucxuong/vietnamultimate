"use client";

import AppBottomBar from "@/components/UIs/Tournament/AppBottomBar";
import Main from "@/components/Home/Main";
import { Transition } from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function TournamentLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const path = usePathname();
    const [animate, setAnimate] = useState(true);

    document.querySelector("body")?.classList.add("dark");

    const handleNav = (path: string) => {
        setAnimate(false);
        setTimeout(() => {
            setAnimate(true);
            router.push(path);
        }, 300);
    };

    useEffect(() => {
        if (new Date().getTime() > new Date(2023, 10, 1).getTime()) {
            handleNav("/tournament/schedule");
        }
    }, []);

    return (
        <section className={`grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)] h-[100dvh] w-[100dvw] overflow-hidden`}>
            <div className="grid gap-2 items-center grid-cols-[3rem_minmax(0,1fr)_3rem] p-2 min-h-16">
                <Button
                    onClick={() => handleNav("/tournament")}
                    variant={"ghost"}
                    size={"icon-lg"}
                    className={`gap-2 rounded-full transition-all duration-300 ${path === "/tournament" ? "pointer-events-none -translate-x-full opacity-0" : ""}`}
                >
                    <span>
                        <ArrowLeft size={18} />
                    </span>
                </Button>

                <span className={`px-6 uppercase font-bold transition-all duration-300 ${path === "/tournament" ? "-translate-x-10 text-left text-4xl pt-6" : "text-center text-xl"}`}>
                    Vietnam HAT 2023
                </span>
            </div>

            <Transition
                show={animate}
                appear={true}
                as={Fragment}
                enter="transition-all duration-300 delay-300 ease-in"
                leave="transition-all duration-200 ease-out"
                enterFrom="scale-110 opacity-0"
                leaveTo="scale-90 opacity-0"
            >
                <Main className={`overflow-y-auto overflow-x-hidden`}>{children}</Main>
            </Transition>
            <AppBottomBar active={path} onChange={handleNav} />
        </section>
    );
}

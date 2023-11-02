"use client";

import { hasLoadedTranslationResources, useAppTranslation } from "@/i18n/client";
import Loading from "@/components/UIs/Loading";
import AppBottomBar from "@/components/UIs/Tournament/AppBottomBar";
import Main from "@/components/Home/Main";
import { Transition } from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function TournamentLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const path = usePathname();
    const [animate, setAnimate] = useState(true);

    document.querySelector("body")?.classList.add("dark");

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <Button
                onClick={() => {
                    setAnimate(false);
                    setTimeout(() => {
                        setAnimate(true);
                        router.push("/tournament");
                    }, 300);
                }}
                variant={"ghost"}
                className={`fixed top-4 left-4 w-[calc(100dvw_-_2rem)] gap-2 justify-between rounded-full transition-all duration-300`}
            >
                <span>
                    <ArrowLeft size={18} />
                </span>
                <span>Vietnam HAT 2023</span>
                <div className="w-[18px]"></div>
            </Button>
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
            <AppBottomBar
                active={path}
                onChange={(e) => {
                    setAnimate(false);
                    setTimeout(() => {
                        setAnimate(true);
                        router.push(e);
                    }, 300);
                }}
            />
        </section>
    );
}

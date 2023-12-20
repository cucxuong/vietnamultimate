"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.querySelector("body")?.classList.add("dark");
    });
    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <div className="grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)] max-w-screen-xl w-full mx-auto gap-6 xl:gap-8 p-6 xl:p-8">
                <div className="text-5xl xl:text-7xl font-semibold capitalize">Ultimate Tournaments</div>
                <div className="grid xl:grid-cols-2 gap-6 content-start">
                    <Link href={"/tournaments/vnhat2023"} className="flex max-xl:flex-col gap-6 rounded-3xl bg-primary bg-opacity-10 backdrop-blur overflow-hidden p-6">
                        <div className="w-96 max-xl:w-full">
                            <Image src="/VNHAT2023.png" width={400} height={250} alt="" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-2xl font-semibold uppercase">
                                18<sup className="normal-case">th</sup> Vietnam HAT 2023 - Black & White HAT
                            </span>
                            <div className="flex gap-4">
                                <div className="grid grid-rows-[auto_minmax(0,1fr)] font-semibold rounded-lg overflow-hidden min-w-max text-primary bg-primary-foreground text-center">
                                    <span className="bg-primary text-primary-foreground text-sm p-2">DEC 2023</span>
                                    <span className="px-2 py-3 text-lg font-bold flex items-center justify-center">
                                        16<sup>th</sup> - 17<sup>th</sup>
                                    </span>
                                </div>
                                <div className="w-full flex items-center justify-center text-secondary-foreground bg-secondary font-medium rounded-md border border-primary-foreground px-2 py-1">ENDED</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

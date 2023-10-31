"use client";

import Main from "@/components/Home/Main";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Input } from "@/components/ui/input";
import { CheckFat } from "@phosphor-icons/react";
import { useState } from "react";

export default function AllRegistration() {
    // GET Players
    const getRegs = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    };

    const [scroll, setScroll] = useState<ScrollTarget>({ top: 0, bottom: 0, height: 0, isDown: true, isEnd: false });
    const [query, setQuery] = useState("");
    const [selectedReg, setSelectedReg] = useState("");

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <ScrollArea className={`scroll-smooth transition-all ease-in-out duration-500`} onScroll={(v) => setScroll(v)}>
                <Main className="w-full lg:container lg:mx-auto">
                    <h2 className="text-5xl font-semibold -mx-6 -mt-6 py-6 px-4 lg:px-6">All Registration</h2>
                    <div className="grid gap-4">
                        <div
                            className={`sticky top-0 grid grid-cols-4 gap-2 -mx-6 transition-all border-b px-4 lg:px-6 ${
                                scroll.top > 0 ? "py-2 bg-background bg-opacity-30 backdrop-blur-xl duration-100" : "pb-4 border-transparent duration-200"
                            }`}
                        >
                            <div className="col-span-3"></div>
                            <Input value={query} onChange={(e) => setQuery(e)} clearable placeholder="Search player" className="w-full border-foreground border-opacity-60" />
                        </div>

                        <div className="border border-primary rounded-3xl grid grid-cols-[3rem_4rem_minmax(0,1fr)_repeat(6,minmax(0,5rem))_repeat(2,minmax(0,1fr))_5rem_5rem] divide-y divide-primary -mx-2 lg:mx-0">
                            <div className={`col-span-full grid grid-cols-[inherit] min-h-[3rem] divide-x divide-primary font-semibold uppercase`}>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center"></span>
                                <span className="py-2 flex items-center justify-center">Code</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center gap-2">Player</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center text-center gap-2">Is female</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Team</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Country</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center text-center gap-2">Is student</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Lunch</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Bus</span>
                                <div className="grid grid-cols-2">
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center col-span-full border-b border-primary">Jersey</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center">Black</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center border-l border-primary">White</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center col-span-full border-b border-primary">Shorts</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center">Black</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center border-l border-primary">White</span>
                                </div>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Disc</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Paid</span>
                            </div>

                            {/* Loop reg list */}
                            {getRegs().map((item, index) => (
                                <div
                                    key={item}
                                    className={`col-span-full grid grid-cols-[inherit] min-h-[3rem] divide-x divide-primary bg-foreground cursor-pointer ${
                                        selectedReg === item.toString() ? "bg-opacity-10 font-medium backdrop-blur" : "bg-opacity-0 hover:bg-opacity-5"
                                    }`}
                                    onClick={() => setSelectedReg((v) => (v === item.toString() ? "" : item.toString()))}
                                >
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center">{index + 1}</span>
                                    <span className="py-2 flex items-center justify-center">Code</span>
                                    <div className="px-3 lg:px-4 py-2 grid">
                                        <span>Name (Nickname)</span>
                                        <span>Email</span>
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Team</span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Country</span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                    <div className="grid grid-cols-2 divide-x divide-primary">
                                        <div className="grid grid-cols-[minmax(0,1fr)_auto] px-4 gap-4 py-2 place-content-center">
                                            <span>Size</span>
                                            <span>x QTY</span>
                                        </div>
                                        <div className="grid grid-cols-[minmax(0,1fr)_auto] px-4 gap-4 py-2 place-content-center">
                                            <span>Size</span>
                                            <span>x QTY</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-primary">
                                        <div className="grid grid-cols-[minmax(0,1fr)_auto] px-4 gap-4 py-2 place-content-center">
                                            <span>Size</span>
                                            <span>x QTY</span>
                                        </div>
                                        <div className="grid grid-cols-[minmax(0,1fr)_auto] px-4 gap-4 py-2 place-content-center">
                                            <span>Size</span>
                                            <span>x QTY</span>
                                        </div>
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">x QTY</span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">
                                        <CheckFat size={18} weight="fill" />
                                    </span>

                                    {selectedReg === item.toString() && (
                                        <div className="col-span-full border-t !border-t-primary !border-opacity-30 !border-x-0 p-4">
                                            <div className="grid grid-cols-5 gap-6">
                                                <div className="col-span-4 grid grid-cols-2 gap-y-4 gap-x-8">
                                                    <div className="grid">
                                                        <span className="truncate font-normal">How long have you played Ultimate Frisbee?</span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Playing experience?</span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">What team are you playing for?</span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Throwing skill?</span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Catching skill?</span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Cutting skill?</span>
                                                        <span className="truncate font-normal">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Defense skill?</span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Fitness and agility?</span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Are you interested in the captain position or wish to be a captain? </span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>
                                                </div>

                                                <div className="grid items-center content-start gap-4">
                                                    <div className="grid">
                                                        <span className="truncate font-normal">Are you vegan? </span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Allergies? </span>
                                                        <span className="truncate">Answer...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Main>
            </ScrollArea>
        </section>
    );
}

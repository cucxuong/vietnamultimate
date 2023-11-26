"use client";

import Main from "@/components/Home/Main";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Input } from "@/components/ui/input";
import { CaretDown, CheckFat } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { format } from "date-fns";
import { PlayerStatus } from "@/utils/vietnam-hat-2023.utils";

// Temp
type PlayerReg = {
    code?: string;
    name?: string;
    email?: string;
    nickname?: string;
    yob?: string;
    gender?: string;
    country?: string;
    options?: {
        info: { is_student: boolean };
        skills: {
            years: number;
            throwing: number;
            catching: number;
            cutting: number;
            defense: number;
            fitness: number;
            playExp: number;
            beACaptain: number;
            team: string;
        };
        addition: {
            lunch: boolean;
            isVegan: boolean;
            allergies: string;
            bus: boolean;
            new_jerseys: { id: string; color: string; size: string }[];
            jerseys: { id: string; color: string; size: string }[];
            shorts: { id: string; color: string; size: string }[];
            new_disc: number;
            disc: number;
        };
    };
    totalFee?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
    note?: string;
};

export default function AllRegistration({ players }: { players: PlayerReg[] }) {
    const router = useRouter();

    const [scroll, setScroll] = useState<ScrollTarget>({ top: 0, bottom: 0, height: 0, isDown: true, isEnd: false });
    const [query, setQuery] = useState("");
    const [expand, setExpand] = useState(false);
    const [selectedReg, setSelectedReg] = useState<string | undefined>("");

    const totalAmount = (fee: number, country: string) => {
        if (country === "Singapore") {
            return `${Intl.NumberFormat("en-US")
                .format(Math.ceil(fee / 17500))
                .replaceAll(",", "'")} SGD`;
        }
        if (country === "Malaysia") {
            return `${Intl.NumberFormat("en-US")
                .format(Math.ceil(fee / 5000))
                .replaceAll(",", "'")} MYR`;
        }
        if (country === "Philippines") {
            return `${Intl.NumberFormat("en-US")
                .format(Math.ceil(fee / 425))
                .replaceAll(",", "'")} PHP`;
        }
        if (country === "Vietnam") {
            return `${Intl.NumberFormat("en-US")
                .format(Math.ceil(fee / 1000))
                .replaceAll(",", "'")}K VND`;
        }
        return `${Intl.NumberFormat("en-US")
            .format(Math.ceil(fee / 24500))
            .replaceAll(",", "'")} USD`;
    };
    // @ts-ignore
    const groupBy = (xs, key) => {
        // @ts-ignore
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    const filterPlayers = (search: string) => {
        return players
            .filter((p) => JSON.stringify(Object.values(p)).toLowerCase().replace(/\s/, "").includes(search.toLowerCase().replace(/\s/, "")))
            .sort((a, b) => {
                const aOrder =
                    a.status === PlayerStatus.expired || a.status === PlayerStatus.cancelled
                        ? 0
                        : a.status === PlayerStatus.paid
                        ? 1
                        : a.status === PlayerStatus.halfpaid
                        ? 2
                        : a.status === PlayerStatus.confirmed
                        ? 3
                        : 4;
                const bOrder =
                    b.status === PlayerStatus.expired || b.status === PlayerStatus.cancelled
                        ? 0
                        : b.status === PlayerStatus.paid
                        ? 1
                        : b.status === PlayerStatus.halfpaid
                        ? 2
                        : b.status === PlayerStatus.confirmed
                        ? 3
                        : 4;
                const c1 = bOrder - aOrder;
                // if (c1 !== 0) {
                //     return c1;
                // }
                return c1 || (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
            });
    };

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <ScrollArea className={`scroll-smooth transition-all ease-in-out duration-500`} onScroll={(v) => setScroll(v)}>
                <Main className="w-full lg:container lg:mx-auto gap-6">
                    <div className={`grid grid-cols-4 max-sm:grid-cols-1 gap-2 transition-all`}>
                        <div className="col-[1/-2]">
                            <h2 className="text-5xl max-sm:text-3xl font-semibold">All Registration</h2>
                        </div>
                        <div className="w-full flex gap-4">
                            <div className="grid w-full">
                                <Input value={query} onChange={(e) => setQuery(e)} clearable placeholder="Search player" className="border-foreground border-opacity-60" />
                            </div>
                            <Button className="sm:hidden gap-2" onClick={() => setExpand((e) => !e)}>
                                <CaretDown size={18} weight="bold" className={`transition-all ${expand ? "rotate-180" : ""}`} />
                            </Button>
                        </div>
                    </div>

                    {/* Analyis */}
                    <section className={`grid sm:grid-cols-[minmax(0,1fr)_auto] max-sm:text-base text-lg max-sm:gap-2 gap-4 ${expand ? "" : "max-sm:!hidden"}`}>
                        <div className="flex max-sm:flex-col">
                            <div className="w-full sm:max-w-[12rem] border sm:border-r-0 max-sm:border-b-0 rounded-2xl sm:rounded-r-none max-sm:rounded-b-none p-4 lg:p-6 bg-accent text-accent-foreground grid max-sm:grid-cols-2 gap-x-6 gap-y-1 content-center">
                                <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                    <div className="font-medium opacity-70 truncate">Lunch (R)</div>
                                    <div className="font-semibold text-right text-sm font-mono">
                                        {
                                            players.filter(
                                                (p) =>
                                                    p.options?.addition.lunch &&
                                                    !p.options?.addition.isVegan &&
                                                    (p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed),
                                            ).length
                                        }
                                        /
                                        {
                                            players.filter((p) => p.options?.addition.lunch && !p.options?.addition.isVegan && p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                .length
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                    <div className="font-medium opacity-70 truncate">Lunch (V)</div>
                                    <div className="font-semibold text-right text-sm font-mono">
                                        {
                                            players.filter(
                                                (p) =>
                                                    p.options?.addition.lunch &&
                                                    p.options?.addition.isVegan &&
                                                    (p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed),
                                            ).length
                                        }
                                        /
                                        {
                                            players.filter((p) => p.options?.addition.lunch && p.options?.addition.isVegan && p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                .length
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                    <div className="font-medium opacity-70 truncate">Bus</div>
                                    <div className="font-semibold text-right text-sm font-mono">
                                        {
                                            players.filter(
                                                (p) => p.options?.addition.bus && (p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed),
                                            ).length
                                        }
                                        /{players.filter((p) => p.options?.addition.bus && p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled).length}
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                    <div className="font-medium opacity-70 truncate">Disc</div>
                                    <div className="font-semibold text-right text-sm font-mono">
                                        {players
                                            .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                            .reduce((total, p) => total + (p.options?.addition?.disc || 0) + (p.options?.addition?.new_disc || 0), 0)}
                                        /
                                        {players
                                            .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                            .reduce((total, p) => total + (p.options?.addition?.disc || 0) + (p.options?.addition?.new_disc || 0), 0)}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full border rounded-2xl sm:rounded-l-none max-sm:rounded-t-none p-4 lg:p-6 bg-accent text-accent-foreground grid sm:grid-cols-[minmax(0,9fr)_auto_minmax(0,6fr)] gap-2 sm:gap-4">
                                <div className="grid grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">
                                            Black Jerseys{" "}
                                            <span className="font-mono text-sm">
                                                {players
                                                    .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                    .reduce(
                                                        (total, p) =>
                                                            total +
                                                            (p.options?.addition?.jerseys?.filter((j) => j.color === "black").length || 0) +
                                                            (p.options?.addition?.new_jerseys?.filter((j) => j.color === "black").length || 0),
                                                        0,
                                                    )}
                                                /
                                                {players
                                                    .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                    .reduce(
                                                        (total, p) =>
                                                            total +
                                                            (p.options?.addition?.jerseys?.filter((j) => j.color === "black").length || 0) +
                                                            (p.options?.addition?.new_jerseys?.filter((j) => j.color === "black").length || 0),
                                                        0,
                                                    )}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            {["xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl", "5xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-xs opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono text-xs">
                                                        {players
                                                            .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                            .reduce(
                                                                (total, p) =>
                                                                    total +
                                                                    (p.options?.addition.jerseys?.filter((j) => j.color === "black" && j.size === size).length || 0) +
                                                                    (p.options?.addition.new_jerseys?.filter((j) => j.color === "black" && j.size === size).length || 0),
                                                                0,
                                                            )}
                                                        /
                                                        {players
                                                            .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                            .reduce(
                                                                (total, p) =>
                                                                    total +
                                                                    (p.options?.addition.jerseys?.filter((j) => j.color === "black" && j.size === size).length || 0) +
                                                                    (p.options?.addition.new_jerseys?.filter((j) => j.color === "black" && j.size === size).length || 0),
                                                                0,
                                                            )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-t -mx-4 lg:-mx-6"></div>
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">
                                            White Jerseys{" "}
                                            <span className="font-mono text-sm">
                                                {players
                                                    .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                    .reduce(
                                                        (total, p) =>
                                                            total +
                                                            (p.options?.addition.jerseys?.filter((j) => j.color === "white").length || 0) +
                                                            (p.options?.addition.new_jerseys?.filter((j) => j.color === "white").length || 0),
                                                        0,
                                                    )}
                                                /
                                                {players
                                                    .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                    .reduce(
                                                        (total, p) =>
                                                            total +
                                                            (p.options?.addition.jerseys?.filter((j) => j.color === "white").length || 0) +
                                                            (p.options?.addition.new_jerseys?.filter((j) => j.color === "white").length || 0),
                                                        0,
                                                    )}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            {["xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl", "5xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-xs opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono text-xs">
                                                        {players
                                                            .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                            .reduce(
                                                                (total, p) =>
                                                                    total +
                                                                    (p.options?.addition.jerseys?.filter((j) => j.color === "white" && j.size === size).length || 0) +
                                                                    (p.options?.addition.new_jerseys?.filter((j) => j.color === "white" && j.size === size).length || 0),
                                                                0,
                                                            )}
                                                        /
                                                        {players
                                                            .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                            .reduce(
                                                                (total, p) =>
                                                                    total +
                                                                    (p.options?.addition.jerseys?.filter((j) => j.color === "white" && j.size === size).length || 0) +
                                                                    (p.options?.addition.new_jerseys?.filter((j) => j.color === "white" && j.size === size).length || 0),
                                                                0,
                                                            )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="max-sm:border-t sm:border-l max-sm:-mx-4 sm:-my-6"></div>
                                <div className="grid grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">
                                            Black Shorts{" "}
                                            <span className="font-mono text-sm">
                                                {players
                                                    .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                    .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "black").length || 0), 0)}
                                                /
                                                {players
                                                    .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                    .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "black").length || 0), 0)}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            {["xs", "s", "m", "l", "xl", "2xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-xs opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono text-xs">
                                                        {players
                                                            .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                            .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "black" && j.size === size).length || 0), 0)}
                                                        /
                                                        {players
                                                            .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                            .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "black" && j.size === size).length || 0), 0)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-t -mx-4 lg:-mx-6"></div>
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">
                                            White Shorts{" "}
                                            <span className="font-mono text-sm">
                                                {players
                                                    .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                    .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "white").length || 0), 0)}
                                                /
                                                {players
                                                    .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                    .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "white").length || 0), 0)}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            {["xs", "s", "m", "l", "xl", "2xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-xs opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono text-xs">
                                                        {players
                                                            .filter((p) => p.status === PlayerStatus.paid || p.status === PlayerStatus.halfpaid || p.status === PlayerStatus.confirmed)
                                                            .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "white" && j.size === size).length || 0), 0)}
                                                        /
                                                        {players
                                                            .filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled)
                                                            .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "white" && j.size === size).length || 0), 0)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:min-w-max grid sm:grid-cols-[minmax(0,1fr)_auto] gap-[inherit]">
                            <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid content-start gap-2 dark">
                                <div className="flex justify-between items-center gap-4 truncate">
                                    <div className="font-medium opacity-70 leading-tight truncate">Total Players</div>
                                    <div className="font-semibold text-right font-mono">{players.filter((p) => p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled).length}</div>
                                </div>
                                <div className="grid content-center grid-cols-2 gap-x-8">
                                    <div className="flex justify-between items-baseline text-sm gap-4">
                                        <div className="font-medium opacity-70">Female</div>
                                        <div className="font-semibold text-right font-mono">
                                            {players.filter((p) => p.gender === "female" && p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled).length}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline text-sm gap-4">
                                        <div className="font-medium opacity-70">Male</div>
                                        <div className="font-semibold text-right font-mono">
                                            {players.filter((p) => p.gender === "male" && p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled).length}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline text-sm gap-4">
                                        <div className="font-medium opacity-70">Student</div>
                                        <div className="font-semibold text-right font-mono">
                                            {players.filter((p) => p.options?.info.is_student && p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled).length}
                                        </div>
                                    </div>

                                    <div className="border-t border-current opacity-5 col-span-full my-2"></div>
                                    {
                                        // @ts-ignore
                                        [...new Set(players.map((p) => p.country))].map((c) => (
                                            <div key={c} className={`flex justify-between items-baseline text-sm gap-4`}>
                                                <div className="font-medium opacity-70 truncate max-w-[4rem]">{c}</div>
                                                <div className="font-semibold text-right font-mono">
                                                    {players.filter((p) => p.country === c && p.status !== PlayerStatus.expired && p.status !== PlayerStatus.cancelled).length}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground flex flex-col gap-2 dark">
                                <div className="grid gap-2">
                                    <div className="flex justify-between items-center gap-4 truncate">
                                        <div className="font-medium opacity-70 leading-tight truncate">Total Registration</div>
                                        <div className="font-semibold text-right font-mono">{players.length}</div>
                                    </div>
                                    <div className="grid grid-cols-2 content-center gap-x-8">
                                        <div className="flex justify-between items-center text-sm gap-4">
                                            <div className="font-medium opacity-70">Waiting</div>
                                            <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === PlayerStatus.pending).length}</div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm gap-4">
                                            <div className="font-medium opacity-70">Paid</div>
                                            <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === PlayerStatus.paid).length}</div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm gap-4">
                                            <div className="font-medium opacity-70">Canceled</div>
                                            <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === PlayerStatus.cancelled).length}</div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm gap-4">
                                            <div className="font-medium opacity-70">Half-paid</div>
                                            <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === PlayerStatus.halfpaid).length}</div>
                                        </div>
                                        <div className="col-start-2 flex justify-between items-center text-sm gap-4">
                                            <div className="font-medium opacity-70">Confirmed</div>
                                            <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === PlayerStatus.confirmed).length}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-current opacity-5"></div>
                                <div className="grid">
                                    <div className="font-medium opacity-70">Total Paid</div>
                                    <div className="font-semibold text-right font-mono">
                                        {totalAmount(
                                            players.reduce(
                                                (total, p) => total + (p.status === PlayerStatus.paid ? p.totalFee || 0 : p.status === PlayerStatus.halfpaid ? (p.totalFee || 0) / 2 : 0),
                                                0,
                                            ),
                                            "Vietnam",
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reg datatable */}
                    <div className="grid gap-4">
                        <div className="sm:border sm:border-primary rounded-3xl font-medium grid sm:grid-cols-[4rem_minmax(0,1fr)_repeat(2,minmax(0,6rem))_repeat(4,minmax(0,4rem))_repeat(2,minmax(0,10rem))_4rem_minmax(0,1fr)_6rem] sm:divide-y sm:divide-primary max-sm:gap-4">
                            <div
                                className={`col-span-full max-sm:!hidden grid grid-cols-[inherit] min-h-[3rem] divide-x divide-primary font-semibold uppercase text-xs rounded-t-[inherit] bg-background`}
                            >
                                <span className="py-2 flex items-center justify-center">Code</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center gap-2">Player</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Team</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Country</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center text-center gap-2">Is female</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center text-center gap-2">Is student</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Lunch</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Bus</span>
                                <div className="grid grid-cols-2">
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center col-span-full border-b border-primary">Jersey</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center truncate">Black</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center border-l border-primary truncate">White</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center col-span-full border-b border-primary">Shorts</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center truncate">Black</span>
                                    <span className="px-3 lg:px-4 py-2 flex justify-center items-center border-l border-primary truncate">White</span>
                                </div>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Disc</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-end gap-2">Total</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Status</span>
                            </div>

                            {/* Loop reg list */}
                            {filterPlayers(query).map((player, index) => (
                                <div
                                    key={player.code}
                                    className={`col-span-full backdrop-blur grid max-sm:grid-cols-[repeat(2,auto_minmax(0,1fr))] max-sm:border max-sm:rounded-3xl max-sm:border-primary max-sm:pr-4 max-sm:pt-2 max-sm:pb-4 max-sm:gap-y-2 max-sm:items-baseline sm:grid-cols-[inherit] min-h-[3rem] sm:divide-x sm:divide-primary cursor-pointer ${
                                        selectedReg === player.code ? "bg-primary bg-opacity-10 font-semibold" : "bg-background"
                                    } ${index === filterPlayers(query).length - 1 ? "rounded-b-[inherit]" : ""} ${index === 0 ? "max-sm:rounded-t-[inherit]" : ""} ${
                                        player.status === PlayerStatus.expired || player.status === PlayerStatus.cancelled ? "text-gray-400" : ""
                                    }`}
                                    onClick={() => setSelectedReg((v) => (v === player.code ? "" : player.code))}
                                    title={`Registered at ${format(player.createdAt || 0, "dd/MM/yyyy")}`}
                                >
                                    <span className="py-2 flex items-center max-sm:self-center sm:justify-center max-sm:px-4 max-sm:text-2xl">{player.code}</span>
                                    <div className="max-sm:col-span-3 max-sm:self-center max-sm:pl-4 sm:px-3 lg:px-4 py-2 grid">
                                        <span>
                                            {player.name || "Name"}
                                            {player.nickname ? ` (${player.nickname || "Nickname"})` : ""} {player.yob}
                                        </span>
                                        <span className="text-xs truncate">{player.email || "Email"}</span>
                                        <span className="text-xs text-indigo-400 italic">{player.note}</span>
                                    </div>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-baseline uppercase text-xs">Team</span>
                                    <span className="sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">{player.options?.skills.team}</span>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-baseline uppercase text-xs">Country</span>
                                    <span className="sm:py-2 sm:px-2 flex items-center sm:justify-center gap-2">
                                        <span className="truncate">{player.country}</span>
                                    </span>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-center uppercase text-xs">Is female</span>
                                    <span className="max-sm:self-center sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">
                                        {player.gender === "female" ? <CheckFat size={18} weight="fill" /> : <X size={18} strokeWidth={6} className="sm:hidden opacity-10" />}
                                    </span>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-center uppercase text-xs">Is student</span>
                                    <span className="max-sm:self-center sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">
                                        {player.options?.info.is_student ? <CheckFat size={18} weight="fill" /> : <X size={18} strokeWidth={6} className="sm:hidden opacity-10" />}
                                    </span>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-center uppercase text-xs">Lunch</span>
                                    <span className="max-sm:self-center sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">
                                        {player.options?.addition.lunch ? <CheckFat size={18} weight="fill" /> : <X size={18} strokeWidth={6} className="sm:hidden opacity-10" />}
                                    </span>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-center uppercase text-xs">Bus</span>
                                    <span className="max-sm:self-center sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">
                                        {player.options?.addition.bus ? <CheckFat size={18} weight="fill" /> : <X size={18} strokeWidth={6} className="sm:hidden opacity-10" />}
                                    </span>

                                    <div className="max-sm:col-span-full max-sm:border-t max-sm:-mr-4 max-sm:pr-4 grid grid-cols-2 divide-x sm:divide-primary">
                                        <span className="sm:hidden px-4 pt-2 sm:py-2 flex items-baseline uppercase text-xs">Black jersey</span>
                                        <span className="sm:hidden px-4 pt-2 sm:py-2 flex items-baseline uppercase text-xs">White jersey</span>

                                        <div className="grid max-sm:px-4 px-3 pb-2 lg:px-4 sm:py-2 max-sm:place-content-start place-content-center !border-none">
                                            {Object.keys(groupBy(player.options?.addition?.jerseys?.filter((j) => j.color === "black") ?? [], "size")).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="sm:text-right">{player.options?.addition.jerseys?.filter((j) => j.color === "black" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                            {Object.keys(groupBy(player.options?.addition?.new_jerseys?.filter((j) => j.color === "black") ?? [], "size")).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="sm:text-right">{player.options?.addition?.new_jerseys?.filter((j) => j.color === "black" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid max-sm:px-4 px-3 pb-2 lg:px-4 sm:py-2 max-sm:place-content-start place-content-center">
                                            {Object.keys(groupBy(player.options?.addition?.jerseys?.filter((j) => j.color === "white") ?? [], "size")).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="sm:text-right">{player.options?.addition?.jerseys?.filter((j) => j.color === "white" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                            {Object.keys(groupBy(player.options?.addition?.new_jerseys?.filter((j) => j.color === "white") ?? [], "size")).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="sm:text-right">{player.options?.addition?.new_jerseys?.filter((j) => j.color === "white" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="max-sm:col-span-full max-sm:border-y max-sm:-mr-4 max-sm:-mt-2 max-sm:pr-4 grid grid-cols-2 divide-x sm:divide-primary">
                                        <span className="sm:hidden px-4 pt-2 sm:py-2 flex items-baseline uppercase text-xs">Black shorts</span>
                                        <span className="sm:hidden px-4 pt-2 sm:py-2 flex items-baseline uppercase text-xs">White shorts</span>

                                        <div
                                            className={`grid max-sm:px-4 px-3 pb-2 lg:px-4 sm:py-2 max-sm:place-content-start place-content-center !border-none ${
                                                player.updatedAt &&
                                                player.updatedAt.getTime() <= new Date(2023, 10, 20, 21, 0, 0).getTime() &&
                                                (player.status === PlayerStatus.halfpaid || player.status === PlayerStatus.paid || player.status === PlayerStatus.confirmed)
                                                    ? "text-indigo-500"
                                                    : ""
                                            }`}
                                        >
                                            {Object.keys(
                                                groupBy(
                                                    player.options?.addition.shorts.filter((j) => j.color === "black"),
                                                    "size",
                                                ),
                                            ).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="sm:text-right">{player.options?.addition.shorts.filter((j) => j.color === "black" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div
                                            className={`grid max-sm:px-4 px-3 pb-2 lg:px-4 sm:py-2 max-sm:place-content-start place-content-center ${
                                                player.updatedAt &&
                                                player.updatedAt.getTime() <= new Date(2023, 10, 20, 21, 0, 0).getTime() &&
                                                (player.status === PlayerStatus.halfpaid || player.status === PlayerStatus.paid || player.status === PlayerStatus.confirmed)
                                                    ? "text-indigo-500"
                                                    : ""
                                            }`}
                                        >
                                            {Object.keys(
                                                groupBy(
                                                    player.options?.addition.shorts.filter((j) => j.color === "white"),
                                                    "size",
                                                ),
                                            ).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="sm:text-right">{player.options?.addition.shorts.filter((j) => j.color === "white" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-baseline uppercase text-xs">Disc</span>
                                    <span className="sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">
                                        x {(player.options?.addition?.disc || 0) + (player.options?.addition?.new_disc || 0)}
                                    </span>

                                    <span className="max-sm:col-start-1 sm:hidden px-4 sm:py-2 flex items-baseline uppercase text-xs">Total fee</span>
                                    <div className="max-sm:col-span-3 sm:px-3 lg:px-4 sm:py-2 sm:grid content-center sm:text-right font-mono">
                                        <span>{totalAmount(player.totalFee || 0, "Vietnam")}</span>
                                        {player.country && player.country !== "Vietnam" && <span> ≈ {totalAmount(player.totalFee || 0, player.country)}</span>}
                                    </div>

                                    <span className="sm:hidden px-4 sm:py-2 flex items-center uppercase text-xs">Status</span>
                                    <span className="max-sm:self-center sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">
                                        {player.status === PlayerStatus.paid && (
                                            <span className="uppercase px-1.5 py-0.5 bg-primary text-primary-foreground grid place-content-center text-sm font-bold rounded">PAID</span>
                                        )}
                                        {player.status === PlayerStatus.confirmed && (
                                            <span className="uppercase px-1.5 py-0.5 border border-primary text-primary grid place-content-center text-sm font-bold rounded">CONFIRMED</span>
                                        )}
                                        {player.status === PlayerStatus.halfpaid && (
                                            <span className="uppercase px-1.5 py-0.5 bg-primary bg-opacity-30 text-primary grid place-content-center text-sm font-bold rounded">HALFPAID</span>
                                        )}
                                        {player.status === PlayerStatus.expired && (
                                            <span className="uppercase px-1.5 py-0.5 bg-accent text-gray-400 grid place-content-center text-sm rounded">EXPIRED</span>
                                        )}
                                        {player.status === PlayerStatus.cancelled && (
                                            <span className="uppercase px-1.5 py-0.5 bg-accent text-gray-400 grid place-content-center text-sm rounded">CANCELED</span>
                                        )}
                                    </span>

                                    {selectedReg === player.code && (
                                        <div className="col-span-full border-t !border-t-primary !border-opacity-30 !border-x-0 p-4">
                                            <div className="grid sm:grid-cols-5 gap-6">
                                                <div className="sm:col-span-4 grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                                    <div className="grid">
                                                        <span className="truncate font-normal">How long have you played Ultimate Frisbee?</span>
                                                        <span>
                                                            {player.options?.skills.years}.{" "}
                                                            {["Less than 1 year", "1 - 3 years", "3 - 5 years", "5 - 10 years", "More than 10 years"][(player.options?.skills.years || 1) - 1]}
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Playing experience?</span>
                                                        <span>
                                                            {player.options?.skills.playExp}.{" "}
                                                            {
                                                                [
                                                                    "Haven't really played much at all",
                                                                    "Played in some regular pick-up games",
                                                                    "Played pick-up quite regularly or played in leagues",
                                                                    "Played on Club teams or played in tournament regularly",
                                                                    "Have been playing for quite sometime and have played at high levels of ultimate",
                                                                ][(player.options?.skills.playExp || 1) - 1]
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Throwing skill?</span>
                                                        <span>
                                                            {player.options?.skills.throwing}.{" "}
                                                            {
                                                                [
                                                                    "Can throw backhand and forehand consistently",
                                                                    "Can throw backhand and forehand consistently if no defender is marking",
                                                                    "Can throw backhand and forehand consistently when a defender is marking",
                                                                    "Make decent decisions, can break marks, and handle well",
                                                                    "Make significant decisions, very consitent with all kinds of throws, including hucking",
                                                                ][(player.options?.skills.throwing || 1) - 1]
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Catching skill?</span>
                                                        <span>
                                                            {player.options?.skills.catching}.{" "}
                                                            {
                                                                [
                                                                    "Have trouble catching a disc even without defender on me",
                                                                    "Can catch a disc when being guarded",
                                                                    "Can read the disc well and have no trouble making catches under pressure",
                                                                    "Can read hucks and I've got good hands under defensive pressure",
                                                                    "Can catch anything under intense pressure in any situation",
                                                                ][(player.options?.skills.catching || 1) - 1]
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Cutting skill?</span>
                                                        <span>
                                                            {player.options?.skills.cutting}.{" "}
                                                            {
                                                                [
                                                                    "Develop an understanding of the game, can perform basic straight-line cuts",
                                                                    "Understand the importantce of timing, changing speed and using fakes to get open",
                                                                    "Can make effective undercuts, deep cuts and diagonal cuts to create separation from defenders",
                                                                    "Can execute complex cutting, possess exceptional speed, agility and field awareness",
                                                                    "Can execute a wide range of cuts with precision and exploit defensive weaknesses",
                                                                ][(player.options?.skills.cutting || 1) - 1]
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Defense skill?</span>
                                                        <span>
                                                            {player.options?.skills.defense}.{" "}
                                                            {
                                                                [
                                                                    "Do not understand the basics of defense, only know how to mark",
                                                                    "Understand the force",
                                                                    "Understand zone defense and poaching",
                                                                    "Can defend well and understand all defensive strategies",
                                                                    "Can perform all advanced defensive strategies to shutdown offender",
                                                                ][(player.options?.skills.defense || 1) - 1]
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Fitness and agility?</span>
                                                        <span>
                                                            {player.options?.skills.fitness}.{" "}
                                                            {
                                                                [
                                                                    "Have weak stamina and speed, can only play a few points",
                                                                    "Have speed, can run in pong points but quickly lost stamina",
                                                                    "Have endurance and quickness",
                                                                    "Have speed, ability to change direction rapidly and stability",
                                                                    "Have exceptional fitness and agility, can stay for the whole game",
                                                                ][(player.options?.skills.fitness || 1) - 1]
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Are you interested in the captain position or wish to be a captain? </span>
                                                        <span>
                                                            {player.options?.skills.beACaptain}. {["Yes", "No", "I can try", "If I'm the only choice"][(player.options?.skills.beACaptain || 1) - 1]}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid items-center content-start gap-4">
                                                    <div className="grid">
                                                        <span className="truncate font-normal">Are you vegan? </span>
                                                        <span>{player.options?.addition.isVegan ? "Yes" : "No"}</span>
                                                    </div>

                                                    {player.options?.addition.allergies && (
                                                        <div className="grid">
                                                            <span className="truncate font-normal">Allergies? </span>
                                                            <span className="truncate">{player.options?.addition.allergies}</span>
                                                        </div>
                                                    )}

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Registered date </span>
                                                        <span className="truncate">{format(player.createdAt || 0, "dd/MM/yyyy")}</span>
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-span-full grid"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <Input placeholder="Note..." value={player.note} onChange={(e) => (player.note = e)} />
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

"use client";

import Main from "@/components/Home/Main";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Input } from "@/components/ui/input";
import { CaretDown, CheckFat } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { getVietnamHatPlayers } from "@/api/admin/vietnam-hat-2023/players";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { format } from "date-fns";

export default function AllRegistration() {
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
            info: { isStudent: boolean };
            skills: { years: number; throwing: number; catching: number; cutting: number; defense: number; fitness: number; playExp: number; beACaptain: number; team: string };
            addition: {
                lunch: boolean;
                isVegan: boolean;
                allergies: string;
                bus: boolean;
                jerseys: { id: string; color: string; size: string }[];
                shorts: { id: string; color: string; size: string }[];
                disc: number;
            };
        };
        totalFee?: number;
        status?: string;
        createdAt?: Date;
    };

    const [players, setPlayers] = useState<PlayerReg[]>([
        {
            code: "1234",
            name: "Nguyen Minh Hoang",
            email: "mhoang.tt09@gmail.com",
            nickname: "CX",
            yob: "1991",
            gender: "male",
            country: "Malaysia",
            options: {
                info: { isStudent: false },
                skills: { years: 5, throwing: 3, catching: 3, cutting: 3, defense: 3, fitness: 2, playExp: 3, beACaptain: 2, team: "Baymax" },
                addition: {
                    lunch: true,
                    isVegan: false,
                    allergies: "",
                    bus: false,
                    jerseys: [
                        { id: "j-1", color: "black", size: "2xl" },
                        { id: "j-2", color: "white", size: "2xl" },
                        { id: "j-2", color: "white", size: "xl" },
                    ],
                    shorts: [{ id: "j-3", color: "black", size: "xl" }],
                    disc: 1,
                },
            },
            totalFee: 2180000,
            status: "paid",
            createdAt: new Date(2023, 9, 30),
        },
        {
            code: "1235",
            name: "Nguyen Minh Hoang",
            email: "mhoang.tt09@gmail.com",
            nickname: "CX",
            yob: "1991",
            gender: "male",
            country: "Vietnam",
            options: {
                info: { isStudent: false },
                skills: { years: 5, throwing: 3, catching: 3, cutting: 3, defense: 3, fitness: 2, playExp: 3, beACaptain: 2, team: "Baymax" },
                addition: {
                    lunch: true,
                    isVegan: false,
                    allergies: "",
                    bus: false,
                    jerseys: [
                        { id: "j-1", color: "black", size: "2xl" },
                        { id: "j-2", color: "white", size: "2xl" },
                    ],
                    shorts: [{ id: "j-3", color: "black", size: "xl" }],
                    disc: 0,
                },
            },
            totalFee: 1610000,
            status: "paid",
            createdAt: new Date(),
        },
    ]);
    const router = useRouter();
    // GET Players
    const fetchPlayers = async () => {
        try {
            // @ts-ignore
            const response = await getVietnamHatPlayers();

            const data = response.data.data;

            const transformedData = data.map((player: any) => {
                return {
                    code: player.player_code,
                    name: player.full_name,
                    email: player.email,
                    nickname: player.nickname,
                    yob: player.year_of_birth,
                    gender: player.gender,
                    country: player.current_country,
                    options: {
                        info: { isStudent: player.selected_options.info.is_student },
                        skills: {
                            years: player.selected_options.skills.years,
                            throwing: player.selected_options.skills.throwing,
                            catching: player.selected_options.skills.catching,
                            cutting: player.selected_options.skills.cutting,
                            defense: player.selected_options.skills.defense,
                            fitness: player.selected_options.skills.fitness,
                            playExp: player.selected_options.skills.playExp,
                            beACaptain: player.selected_options.skills.beACaptain,
                            team: player.selected_options.skills.team,
                        },
                        addition: {
                            lunch: player.selected_options.addition.lunch,
                            isVegan: player.selected_options.addition.isVegan,
                            allergies: player.selected_options.addition.allergies,
                            bus: player.selected_options.addition.bus,
                            jerseys: player.selected_options.addition.jerseys,
                            shorts: player.selected_options.addition.shorts,
                            disc: player.selected_options.addition.disc,
                        },
                    },
                    totalFee: player.total_fee,
                    status: player.status,
                    createdAt: player.created_at,
                };
            });

            // @ts-ignore
            setPlayers([...transformedData]);
        } catch (e) {
            // @ts-ignore
            if (e.response.status === 422) {
                router.push("/admin/authorize");
            } else {
                router.push("/");
            }
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

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
                    <section className={`grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] max-sm:text-base text-lg max-sm:gap-2 gap-4 ${expand ? "" : "max-sm:!hidden"}`}>
                        <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid gap-1 content-center">
                            <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                <div className="font-medium opacity-70">Normal Lunch</div>
                                <div className="font-semibold text-right font-mono">
                                    {players.filter((p) => p.options?.addition.lunch && !p.options?.addition.isVegan && p.status !== "expired").length}
                                </div>
                            </div>
                            <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                <div className="font-medium opacity-70">Vegan Lunch</div>
                                <div className="font-semibold text-right font-mono">
                                    {players.filter((p) => p.options?.addition.lunch && p.options?.addition.isVegan && p.status !== "expired").length}
                                </div>
                            </div>
                            <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                <div className="font-medium opacity-70">Bus</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.options?.addition.bus && p.status !== "expired").length}</div>
                            </div>
                            <div className="flex justify-between items-baseline max-sm:gap-2 gap-4">
                                <div className="font-medium opacity-70">Disc</div>
                                <div className="font-semibold text-right font-mono">
                                    {players.filter((p) => p.status !== "expired").reduce((total, p) => total + (p.options?.addition.disc || 0), 0)}
                                </div>
                            </div>
                        </div>

                        <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid sm:flex gap-2 sm:gap-4">
                            <div className="grid grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                                <div className="grid">
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">Black Jerseys</div>
                                        <div className="flex gap-4 sm:gap-6">
                                            {["xs", "s", "m", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono">
                                                        {players
                                                            .filter((p) => p.status !== "expired")
                                                            .reduce((total, p) => total + (p.options?.addition.jerseys.filter((j) => j.color === "black" && j.size === size).length || 0), 0)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t -mx-4 lg:-mx-6"></div>
                                <div className="grid">
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">White Jerseys</div>
                                        <div className="flex gap-4 sm:gap-6">
                                            {["xs", "s", "m", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono">
                                                        {players
                                                            .filter((p) => p.status !== "expired")
                                                            .reduce((total, p) => total + (p.options?.addition.jerseys.filter((j) => j.color === "white" && j.size === size).length || 0), 0)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="max-sm:border-t sm:border-l max-sm:-mx-4 sm:-my-6"></div>
                            <div className="grid grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                                <div className="grid">
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">Black Shorts</div>
                                        <div className="flex gap-4 sm:gap-6">
                                            {["xs", "s", "m", "lg", "xl", "2xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono">
                                                        {players
                                                            .filter((p) => p.status !== "expired")
                                                            .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "black" && j.size === size).length || 0), 0)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t -mx-4 lg:-mx-6"></div>
                                <div className="grid">
                                    <div className="grid">
                                        <div className="font-medium opacity-70 leading-tight">White Shorts</div>
                                        <div className="flex gap-4 sm:gap-6">
                                            {["xs", "s", "m", "lg", "xl", "2xl"].map((size) => (
                                                <div key={size} className="grid justify-center text-center">
                                                    <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                    <div className="font-semibold font-mono">
                                                        {players
                                                            .filter((p) => p.status !== "expired")
                                                            .reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "white" && j.size === size).length || 0), 0)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:min-w-max grid grid-cols-2 gap-[inherit]">
                            <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid grid-rows-[auto_minmax(0,1fr)] gap-1 dark">
                                <div className="flex justify-between items-center gap-4 truncate">
                                    <div className="font-medium opacity-70 leading-tight truncate">Total Players</div>
                                    <div className="font-semibold text-right font-mono">{players.filter((p) => p.status !== "expired").length}</div>
                                </div>
                                <div className="grid content-center gap-1 pl-4">
                                    <div className="flex justify-between items-baseline gap-4">
                                        <div className="font-medium opacity-70 text-sm">Female</div>
                                        <div className="font-semibold text-right font-mono">{players.filter((p) => p.gender === "female" && p.status !== "expired").length}</div>
                                    </div>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <div className="font-medium opacity-70 text-sm">Male</div>
                                        <div className="font-semibold text-right font-mono">{players.filter((p) => p.gender === "male" && p.status !== "expired").length}</div>
                                    </div>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <div className="font-medium opacity-70 text-sm">Student</div>
                                        <div className="font-semibold text-right font-mono">{players.filter((p) => p.options?.info.isStudent && p.status !== "expired").length}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground flex flex-col justify-between gap-4 dark">
                                <div className="grid">
                                    <div className="flex justify-between items-center gap-4 truncate">
                                        <div className="font-medium opacity-70 leading-tight truncate">Total Registration</div>
                                        <div className="font-semibold text-right font-mono">{players.length}</div>
                                    </div>
                                    <div className="grid content-center gap-1 pl-4">
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="font-medium opacity-70 text-sm">Waiting</div>
                                            <div className="font-semibold text-right font-mono">{players.filter((p) => p.status !== "expired" && p.status !== "paid").length}</div>
                                        </div>
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="font-medium opacity-70 text-sm">Expired</div>
                                            <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === "expired").length}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid">
                                    <div className="flex justify-between items-baseline gap-4">
                                        <div className="font-medium opacity-70">Total Paid</div>
                                        <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === "paid").length}</div>
                                    </div>
                                    <div className="font-semibold text-right font-mono">
                                        {totalAmount(
                                            players.reduce((total, p) => total + (p.status === "paid" ? p.totalFee || 0 : 0), 0),
                                            "Vietnam",
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reg datatable */}
                    <div className="grid gap-4">
                        <div className="sm:border sm:border-primary rounded-3xl font-medium grid sm:grid-cols-[4rem_minmax(0,1fr)_repeat(2,minmax(0,6rem))_repeat(4,minmax(0,4rem))_repeat(2,minmax(0,12rem))_4rem_minmax(0,1fr)_6rem] sm:divide-y sm:divide-primary -mx-2 max-sm:gap-4 lg:mx-0">
                            <div className={`col-span-full max-sm:!hidden grid grid-cols-[inherit] min-h-[3rem] divide-x divide-primary font-semibold uppercase text-xs rounded-t-[inherit] bg-background`}>
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
                            {players
                                .filter((p) => JSON.stringify(Object.values(p)).toLowerCase().replace(/\s/, "").includes(query.toLowerCase().replace(/\s/, "")))
                                .sort((a, b) => {
                                    const aOrder = a.status === "expired" ? 0 : a.status === "paid" ? 1 : 2;
                                    const bOrder = b.status === "expired" ? 0 : b.status === "paid" ? 1 : 2;
                                    const c1 = bOrder - aOrder;
                                    if (c1 !== 0) {
                                        return c1;
                                    }
                                    return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
                                })
                                .map((player, index) => (
                                    <div
                                        key={player.code}
                                        className={`col-span-full backdrop-blur grid max-sm:grid-cols-[repeat(2,auto_minmax(0,1fr))] max-sm:border max-sm:rounded-3xl max-sm:border-primary max-sm:pr-4 max-sm:pt-2 max-sm:pb-4 max-sm:gap-y-2 max-sm:items-baseline sm:grid-cols-[inherit] min-h-[3rem] sm:divide-x sm:divide-primary cursor-pointer ${
                                            selectedReg === player.code ? "bg-primary bg-opacity-10 font-semibold" : "bg-background hover:bg-opacity-5 hover:bg-foreground"
                                        } ${index === players.length - 1 ? "rounded-b-[inherit]" : ""} ${index === 0 ? "max-sm:rounded-t-[inherit]" : ""} ${
                                            player.status === "expired" ? "text-gray-400" : ""
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
                                            <span className="text-xs">{player.email || "Email"}</span>
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
                                            {player.options?.info.isStudent ? <CheckFat size={18} weight="fill" /> : <X size={18} strokeWidth={6} className="sm:hidden opacity-10" />}
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
                                                {Object.keys(
                                                    groupBy(
                                                        player.options?.addition.jerseys.filter((j) => j.color === "black"),
                                                        "size",
                                                    ),
                                                ).map((item) => (
                                                    <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                        <span className="uppercase">{item}</span>
                                                        <span>x</span>
                                                        <span className="sm:text-right">{player.options?.addition.jerseys.filter((j) => j.color === "black" && j.size === item).length}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid max-sm:px-4 px-3 pb-2 lg:px-4 sm:py-2 max-sm:place-content-start place-content-center">
                                                {Object.keys(
                                                    groupBy(
                                                        player.options?.addition.jerseys.filter((j) => j.color === "white"),
                                                        "size",
                                                    ),
                                                ).map((item) => (
                                                    <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                        <span className="uppercase">{item}</span>
                                                        <span>x</span>
                                                        <span className="sm:text-right">{player.options?.addition.jerseys.filter((j) => j.color === "white" && j.size === item).length}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="max-sm:col-span-full max-sm:border-y max-sm:-mr-4 max-sm:-mt-2 max-sm:pr-4 grid grid-cols-2 divide-x sm:divide-primary">
                                            <span className="sm:hidden px-4 pt-2 sm:py-2 flex items-baseline uppercase text-xs">Black shorts</span>
                                            <span className="sm:hidden px-4 pt-2 sm:py-2 flex items-baseline uppercase text-xs">White shorts</span>

                                            <div className="grid max-sm:px-4 px-3 pb-2 lg:px-4 sm:py-2 max-sm:place-content-start place-content-center !border-none">
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

                                            <div className="grid max-sm:px-4 px-3 pb-2 lg:px-4 sm:py-2 max-sm:place-content-start place-content-center">
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
                                        <span className="sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">x {player.options?.addition.disc || 0}</span>

                                        <span className="max-sm:col-start-1 sm:hidden px-4 sm:py-2 flex items-baseline uppercase text-xs">Total fee</span>
                                        <div className="max-sm:col-span-3 sm:px-3 lg:px-4 sm:py-2 sm:grid content-center sm:text-right font-mono">
                                            <span>{totalAmount(player.totalFee || 0, "Vietnam")}</span>
                                            {player.country && player.country !== "Vietnam" && <span> ≈ {totalAmount(player.totalFee || 0, player.country)}</span>}
                                        </div>

                                        <span className="sm:hidden px-4 sm:py-2 flex items-center uppercase text-xs">Status</span>
                                        <span className="max-sm:self-center sm:px-3 lg:px-4 sm:py-2 flex items-center sm:justify-center gap-2">
                                            {player.status === "paid" && (
                                                <span className="uppercase px-1.5 py-0.5 bg-primary text-primary-foreground grid place-content-center text-sm font-bold rounded">PAID</span>
                                            )}
                                            {player.status === "expired" && <span className="uppercase px-1.5 py-0.5 bg-accent text-gray-400 grid place-content-center text-sm rounded">EXPIRED</span>}
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
                                                                {player.options?.skills.beACaptain}.{" "}
                                                                {["Yes", "No", "I can try", "If I'm the only choice"][(player.options?.skills.beACaptain || 1) - 1]}
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

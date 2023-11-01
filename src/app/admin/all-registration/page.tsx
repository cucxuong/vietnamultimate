"use client";

import Main from "@/components/Home/Main";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Input } from "@/components/ui/input";
import { CheckFat } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { getVietnamHatPlayers } from "@/api/admin/vietnam-hat-2023/players";
import { useRouter } from "next/navigation";

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
    };

    const [players, setPlayers] = useState<PlayerReg[]>([
        {
            code: "1234",
            name: "Nguyen Minh Hoang",
            email: "mhoang.tt09@gmail.com",
            nickname: "CX",
            yob: "1991",
            gender: "male",
            country: "Singapore",
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
            return `${Intl.NumberFormat("en-US").format(Math.ceil(fee)).replaceAll(",", "'")} VND`;
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
                    <div
                        className={`sticky top-0 grid grid-cols-4 gap-2 -mx-6 transition-all border-b px-4 lg:px-6 ${
                            scroll.top > 0 ? "py-2 bg-background bg-opacity-30 backdrop-blur-xl duration-100" : "pb-4 border-transparent duration-200"
                        }`}
                    >
                        <div className="col-span-3">
                            <h2 className="text-5xl font-semibold">All Registration</h2>
                        </div>
                        <Input value={query} onChange={(e) => setQuery(e)} clearable placeholder="Search player" className="w-full border-foreground border-opacity-60" />
                    </div>

                    <section className="flex gap-4">
                        <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid gap-2 content-center text-lg">
                            <div className="flex justify-between items-baseline gap-4">
                                <div className="font-medium opacity-70">Normal Lunch</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.options?.addition.lunch && !p.options?.addition.isVegan).length}</div>
                            </div>
                            <div className="flex justify-between items-baseline gap-4">
                                <div className="font-medium opacity-70">Vegan Lunch</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.options?.addition.lunch && p.options?.addition.isVegan).length}</div>
                            </div>
                            <div className="flex justify-between items-baseline gap-4">
                                <div className="font-medium opacity-70">Bus</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.options?.addition.bus).length}</div>
                            </div>
                            <div className="flex justify-between items-baseline gap-4">
                                <div className="font-medium opacity-70">Disc</div>
                                <div className="font-semibold text-right font-mono">{players.reduce((total, p) => total + (p.options?.addition.disc || 0), 0)}</div>
                            </div>
                        </div>

                        <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid gap-2 text-lg">
                            <div className="grid">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="font-medium opacity-70 leading-tight">Black Jerseys</div>
                                    <div className="flex gap-2">
                                        {["xs", "s", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => (
                                            <div key={size} className="grid justify-center text-center pl-4">
                                                <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                <div className="font-semibold font-mono">
                                                    {players.reduce((total, p) => total + (p.options?.addition.jerseys.filter((j) => j.color === "black" && j.size === size).length || 0), 0)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="border-t"></div>
                            <div className="grid">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="font-medium opacity-70 leading-tight">White Jerseys</div>
                                    <div className="flex gap-2">
                                        {["xs", "s", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => (
                                            <div key={size} className="grid justify-center text-center pl-4">
                                                <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                <div className="font-semibold font-mono">
                                                    {players.reduce((total, p) => total + (p.options?.addition.jerseys.filter((j) => j.color === "white" && j.size === size).length || 0), 0)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid gap-2 text-lg">
                            <div className="grid">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="font-medium opacity-70 leading-tight">Black Shorts</div>
                                    <div className="flex gap-2">
                                        {["xs", "s", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => (
                                            <div key={size} className="grid justify-center text-center pl-4">
                                                <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                <div className="font-semibold font-mono">
                                                    {players.reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "black" && j.size === size).length || 0), 0)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="border-t"></div>
                            <div className="grid">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="font-medium opacity-70 leading-tight">White Shorts</div>
                                    <div className="flex gap-2">
                                        {["xs", "s", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => (
                                            <div key={size} className="grid justify-center text-center pl-4">
                                                <div className="font-medium text-sm opacity-70 uppercase">{size}</div>
                                                <div className="font-semibold font-mono">
                                                    {players.reduce((total, p) => total + (p.options?.addition.shorts.filter((j) => j.color === "white" && j.size === size).length || 0), 0)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground grid content-center gap-2 text-lg dark">
                            <div className="flex justify-between items-center gap-4">
                                <div className="font-medium opacity-70 leading-tight">Total Registration</div>
                                <div className="font-semibold text-right font-mono">{players.length}</div>
                            </div>
                            <div className="flex justify-between items-baseline gap-4 pl-4">
                                <div className="font-medium opacity-70 text-sm">Female</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.gender === "female").length}</div>
                            </div>
                            <div className="flex justify-between items-baseline gap-4 pl-4">
                                <div className="font-medium opacity-70 text-sm">Male</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.gender === "male").length}</div>
                            </div>
                            <div className="flex justify-between items-baseline gap-4 pl-4">
                                <div className="font-medium opacity-70 text-sm">Student</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.options?.info.isStudent).length}</div>
                            </div>
                        </div>
                        <div className="w-full border rounded-2xl p-4 lg:p-6 bg-accent text-accent-foreground flex flex-col justify-evenly gap-4 text-lg dark">
                            <div className="flex justify-between items-baseline gap-4">
                                <div className="font-medium opacity-70">Paid</div>
                                <div className="font-semibold text-right font-mono">{players.filter((p) => p.status === "paid").length}</div>
                            </div>
                            <div className="grid">
                                <div className="font-medium opacity-70">Total Amount</div>
                                <div className="font-semibold font-mono">
                                    {totalAmount(
                                        players.reduce((total, p) => total + (p.status === "paid" ? p.totalFee || 0 : 0), 0),
                                        "Vietnam",
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-4">
                        <div className="border border-primary rounded-3xl font-medium grid grid-cols-[3rem_4rem_minmax(0,1fr)_4rem_repeat(2,minmax(0,6rem))_repeat(3,minmax(0,4rem))_repeat(2,minmax(0,12rem))_4rem_minmax(0,1fr)_4rem] divide-y divide-primary -mx-2 lg:mx-0">
                            <div className={`col-span-full grid grid-cols-[inherit] min-h-[3rem] divide-x divide-primary font-semibold uppercase text-xs`}>
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
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">Paid</span>
                            </div>

                            {/* Loop reg list */}
                            {players.map((player, index) => (
                                <div
                                    key={player.code}
                                    className={`col-span-full grid grid-cols-[inherit] min-h-[3rem] divide-x divide-primary bg-foreground cursor-pointer ${
                                        selectedReg === player.code ? "bg-opacity-10 font-semibold backdrop-blur" : "bg-opacity-0 hover:bg-opacity-5"
                                    } ${index === players.length - 1 ? "rounded-b-[inherit]" : ""}`}
                                    onClick={() => setSelectedReg((v) => (v === player.code ? "" : player.code))}
                                >
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center">{index + 1}</span>
                                    <span className="py-2 flex items-center justify-center">{player.code}</span>
                                    <div className="px-3 lg:px-4 py-2 grid">
                                        <span>
                                            {player.name || "Name"}
                                            {player.nickname ? ` (${player.nickname || "Nickname"})` : ""} {player.yob}
                                        </span>
                                        <span className="text-xs">{player.email || "Email"}</span>
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">{player.gender === "female" && <CheckFat size={18} weight="fill" />}</span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">{player.options?.skills.team}</span>
                                    <span className="p-2 flex items-center justify-center gap-2">
                                        <span className="truncate">{player.country}</span>
                                    </span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">{player.options?.info.isStudent && <CheckFat size={18} weight="fill" />}</span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">{player.options?.addition.lunch && <CheckFat size={18} weight="fill" />}</span>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">{player.options?.addition.bus && <CheckFat size={18} weight="fill" />}</span>
                                    <div className="grid grid-cols-2 divide-x divide-primary">
                                        <div className="grid px-3 lg:px-4 py-2 place-content-center">
                                            {Object.keys(
                                                groupBy(
                                                    player.options?.addition.jerseys.filter((j) => j.color === "black"),
                                                    "size",
                                                ),
                                            ).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="text-right">{player.options?.addition.jerseys.filter((j) => j.color === "black" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid px-3 lg:px-4 py-2 place-content-center">
                                            {Object.keys(
                                                groupBy(
                                                    player.options?.addition.jerseys.filter((j) => j.color === "white"),
                                                    "size",
                                                ),
                                            ).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="text-right">{player.options?.addition.jerseys.filter((j) => j.color === "white" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-primary">
                                        <div className="grid px-3 lg:px-4 py-2 place-content-center">
                                            {Object.keys(
                                                groupBy(
                                                    player.options?.addition.shorts.filter((j) => j.color === "black"),
                                                    "size",
                                                ),
                                            ).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="text-right">{player.options?.addition.shorts.filter((j) => j.color === "black" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid px-3 lg:px-4 py-2 place-content-center">
                                            {Object.keys(
                                                groupBy(
                                                    player.options?.addition.shorts.filter((j) => j.color === "white"),
                                                    "size",
                                                ),
                                            ).map((item) => (
                                                <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                                                    <span className="uppercase">{item}</span>
                                                    <span>x</span>
                                                    <span className="text-right">{player.options?.addition.shorts.filter((j) => j.color === "white" && j.size === item).length}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">x 1</span>
                                    <div className="px-3 lg:px-4 py-2 grid content-center text-right font-mono">
                                        <span>{totalAmount(player.totalFee || 0, "Vietnam")}</span>
                                        {player.country && player.country !== "Vietnam" && <span>{totalAmount(player.totalFee || 0, player.country)}</span>}
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2">{player.status === "paid" && <CheckFat size={18} weight="fill" />}</span>

                                    {selectedReg === player.code && (
                                        <div className="col-span-full border-t !border-t-primary !border-opacity-30 !border-x-0 p-4">
                                            <div className="grid grid-cols-5 gap-6">
                                                <div className="col-span-4 grid grid-cols-2 gap-y-4 gap-x-8">
                                                    <div className="grid">
                                                        <span className="truncate font-normal">How long have you played Ultimate Frisbee?</span>
                                                        <span className="truncate">
                                                            {player.options?.skills.years}.{" "}
                                                            {["Less than 1 year", "1 - 3 years", "3 - 5 years", "5 - 10 years", "More than 10 years"][(player.options?.skills.years || 1) - 1]}
                                                        </span>
                                                    </div>

                                                    <div className="grid">
                                                        <span className="truncate font-normal">Playing experience?</span>
                                                        <span className="truncate">
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
                                                        <span className="truncate">
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
                                                        <span className="truncate">
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
                                                        <span className="truncate">
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
                                                        <span className="truncate">
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
                                                        <span className="truncate">
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
                                                        <span className="truncate">
                                                            {player.options?.skills.beACaptain}. {["Yes", "No", "I can try", "If I'm the only choice"][(player.options?.skills.beACaptain || 1) - 1]}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid items-center content-start gap-4">
                                                    <div className="grid">
                                                        <span className="truncate font-normal">Are you vegan? </span>
                                                        <span className="truncate">{player.options?.addition.isVegan ? "Yes" : "No"}</span>
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

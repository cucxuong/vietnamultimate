"use client";
import Main from "@/components/Home/Main";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Input } from "@/components/ui/input";
import { Transition } from "@headlessui/react";
import { CheckFat, Check } from "@phosphor-icons/react";
import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PlayerStatus } from "@/utils/vietnam-hat-2023.utils";
import { Simulate } from "react-dom/test-utils";

export default function PaymentPlayers({
    items,
    onChange,
    country,
}: {
    items: { registrationCode: string; name: string; nickname: string; fee: number; status: PlayerStatus }[];
    onChange: (id: string, value: "full"|"half") => void;
    country: string;
}) {
    const [scroll, setScroll] = useState<ScrollTarget>({ top: 0, bottom: 0, height: 0, isDown: true, isEnd: false });

    const [query, setQuery] = useState("");

    const [dialog, setDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState<{
        registrationCode: string;
        name: string;
        nickname: string;
        fee: number;
        status: PlayerStatus;
    } | null>(null);

    const [players, setPlayers] = useState<
        {
            registrationCode: string;
            name: string;
            nickname: string;
            fee: number;
            status: PlayerStatus;
        }[]
    >([...items]);

    function tooglePaid(code: string, isHalf?: boolean) {
        setPlayers((ps) => [
            ...ps.map((p) => {
                if (p.registrationCode === code) {
                    return { ...p, status: isHalf ? PlayerStatus.halfpaid : PlayerStatus.paid };
                }
                return { ...p };
            }),
        ]);
        setOpenDialog(null);
    }

    const total = (fee: number) => {
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

    useEffect(() => {
        setPlayers(items.filter((p) => (p.registrationCode + p.name + p.nickname).toLowerCase().replace(/\s/g, "").includes(query.toLowerCase().replace(/\s/g, ""))));
    }, [query, items]);

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <ScrollArea className={`scroll-smooth transition-all ease-in-out duration-500`} onScroll={(v) => setScroll(v)}>
                <Main className="w-full lg:max-w-lg lg:mx-auto">
                    <h2 className="text-5xl font-semibold -mx-6 -mt-6 py-6 px-4 lg:px-6">Registered {country} Players</h2>
                    <div className="grid gap-4">
                        <div
                            className={`sticky top-0 grid gap-2 -mx-6 transition-all border-b px-4 lg:px-6 ${
                                scroll.top > 0 ? "py-2 bg-background bg-opacity-30 backdrop-blur-xl duration-100" : "pb-4 lg:pb-6 border-transparent duration-200"
                            }`}
                        >
                            <Input value={query} onChange={(e) => setQuery(e)} clearable placeholder="Search player" className="w-full border-foreground border-opacity-60" />
                        </div>

                        <div className="border border-primary rounded-2xl grid divide-y divide-primary -mx-2 lg:mx-0">
                            <div
                                className={`sticky top-16 grid grid-cols-[4rem_minmax(0,1fr)_6rem] min-h-[3rem] divide-x divide-primary font-semibold uppercase ${
                                    scroll.top > 0 ? "border-y border-primary bg-background bg-opacity-30 backdrop-blur-xl" : "rounded-t-2xl"
                                }`}
                            >
                                <span className="px-3 lg:px-4 py-2 flex items-center">Code</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center gap-2">
                                    Player{" "}
                                    <span className="h-6 min-w-[1.5rem] p-1 inline-flex items-center justify-center font-mono text-sm bg-primary text-primary-foreground rounded-full">
                                        {players.length}
                                    </span>
                                </span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center gap-2 cursor-pointer">
                                    Paid{" "}
                                    <span className="h-6 min-w-[1.5rem] p-1 inline-flex items-center justify-center font-mono text-sm bg-primary text-primary-foreground rounded-full">
                                        {players.filter((p) => p.status === PlayerStatus.paid).length}
                                    </span>
                                </span>
                            </div>
                            {players.map((player) => (
                                <div key={player.registrationCode} className="grid grid-cols-[4rem_minmax(0,1fr)_6rem] min-h-[3rem] divide-x divide-primary font-medium">
                                    <span className="px-3 lg:px-4 py-2 flex items-baseline">{player.registrationCode}</span>
                                    <div className="px-3 lg:px-4 py-2 grid lg:flex lg:justify-between lg:gap-4 items-baseline">
                                        <div className="grid">
                                            <span>{player.name}</span>
                                            {player.nickname && player.nickname !== "" && <small>({player.nickname})</small>}
                                        </div>
                                        <span className="font-mono text-right">{total(player.fee)}</span>
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center">
                                        {player.status === PlayerStatus.paid || player.status === PlayerStatus.halfpaid || player.status === PlayerStatus.pending ? (
                                            <button
                                                className={`h-6 w-6 rounded ${
                                                    player.status === PlayerStatus.paid
                                                        ? "bg-green-100"
                                                        : player.status === PlayerStatus.halfpaid
                                                        ? "border-2 border-green-300"
                                                        : "border-2 border-primary"
                                                } grid place-content-center`}
                                                onClick={() => {
                                                    if (player.status === PlayerStatus.paid) {
                                                        setDialog(true);
                                                    } else {
                                                        setOpenDialog(player);
                                                    }
                                                }}
                                            >
                                                {player.status === PlayerStatus.paid && <CheckFat size={18} weight="fill" className="text-green-600" />}
                                                {player.status === PlayerStatus.halfpaid && <Check size={18} weight="bold" className="text-green-800" />}
                                            </button>
                                        ) : (
                                            <button
                                                className={`h-6 w-32 text-white text-sm rounded ${player.status === PlayerStatus.expired ? "bg-amber-600" : "bg-red-500"} grid place-content-center`}
                                                onClick={() => {}}
                                            >
                                                {PlayerStatus[player.status][0].toUpperCase() + PlayerStatus[player.status].slice(1).toLowerCase()}
                                            </button>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Main>
            </ScrollArea>

            <Transition
                show={openDialog !== null}
                as={Fragment}
                enter="transition-all duration-200 ease-in"
                leave="transition-all duration-100 ease-out"
                enterFrom="translate-y-full opacity-0"
                leaveTo="translate-y-full opacity-0"
            >
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-xl shadow-2xl bg-background text-foreground p-6 w-full max-w-[min(24rem,calc(100dvw_-_3rem))] grid dark gap-4 text-center">
                    <h3 className="text-3xl">Confirm payment?</h3>
                    <div className="rounded-xl border p-4 grid bg-foreground text-background place-content-center">
                        <span>
                            {openDialog?.registrationCode} - <span className="font-semibold">{openDialog?.name}</span>
                        </span>

                        <span className="font-mono font-semibold">{total(openDialog?.fee || 0)}</span>
                    </div>
                    <p>We will send a payment confirmination email to this player.</p>
                    <p>Once you confirm, the action can not be undo.</p>
                    <p>Please make sure that all information are correct.</p>
                    <div className="flex gap-4">
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                setOpenDialog(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                onChange(openDialog?.registrationCode || "", "half");
                                tooglePaid(openDialog?.registrationCode || "", true);
                            }}
                            className="w-full"
                        >
                            Half Paid
                        </Button>
                        <Button
                            onClick={() => {
                                onChange(openDialog?.registrationCode || "", "full");
                                tooglePaid(openDialog?.registrationCode || "");
                            }}
                            className="w-full"
                        >
                            Full Paid
                        </Button>
                    </div>
                </div>
            </Transition>
            <Transition
                show={dialog}
                as={Fragment}
                enter="transition-all duration-200 ease-in"
                leave="transition-all duration-100 ease-out"
                enterFrom="translate-y-full opacity-0"
                leaveTo="translate-y-full opacity-0"
            >
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-xl shadow-2xl bg-background text-foreground p-6 w-full max-w-[min(24rem,calc(100dvw_-_3rem))] grid dark gap-4 text-center">
                    <h3 className="text-3xl">Cannot uncheck</h3>
                    <p>
                        If there is something wrong, <div>please contact organizers.</div>
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                setDialog(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Transition>
        </section>
    );
}

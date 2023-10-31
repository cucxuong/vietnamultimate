"use client";
import Main from "@/components/Home/Main";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Input } from "@/components/ui/input";
import { CheckFat } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function PaymentPlayers({
    items,
    onChange,
    country,
}: {
    items: { registrationCode: string; name: string; nickname: string; fee: number; isPaid: boolean }[];
    onChange: (id: string, value: boolean) => void;
    country: string;
}) {
    const [scroll, setScroll] = useState<ScrollTarget>({ top: 0, bottom: 0, height: 0, isDown: true, isEnd: false });

    const [query, setQuery] = useState("");

    const [players, setPlayers] = useState<{ registrationCode: string; name: string; nickname: string; fee: number; isPaid: boolean }[]>([...items]);
    function tooglePaid(code: string) {
        setPlayers((ps) => [
            ...ps.map((p) => {
                if (p.registrationCode === code) {
                    return { ...p, isPaid: !p.isPaid };
                }
                return { ...p };
            }),
        ]);
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
    }, [query]);

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
                                        {players.filter((p) => p.isPaid).length}
                                    </span>
                                </span>
                            </div>
                            {players.map((player) => (
                                <div key={player.registrationCode} className="grid grid-cols-[4rem_minmax(0,1fr)_6rem] min-h-[3rem] divide-x divide-primary font-medium">
                                    <span className="px-3 lg:px-4 py-2 flex items-baseline">{player.registrationCode}</span>
                                    <div className="px-3 lg:px-4 py-2 grid lg:flex lg:justify-between lg:gap-4 items-baseline">
                                        <div className="grid">
                                            <span>{player.name}</span>
                                            {player.nickname !== "" && <small>({player.nickname})</small>}
                                        </div>
                                        <span className="font-mono text-right">{total(player.fee)}</span>
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center">
                                        <button
                                            className={`h-6 w-6 rounded ${player.isPaid ? "bg-green-100" : "border-2 border-primary"} grid place-content-center`}
                                            onClick={() => {
                                                onChange(player.registrationCode, !player.isPaid);
                                                tooglePaid(player.registrationCode);
                                            }}
                                        >
                                            {player.isPaid && <CheckFat size={18} weight="fill" className="text-green-600" />}
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Main>
            </ScrollArea>
        </section>
    );
}

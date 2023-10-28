"use client";
import Main from "@/components/Home/Main";
import ScrollArea from "@/components/UIs/ScrollArea";
import { Input } from "@/components/ui/input";
import { CheckFat } from "@phosphor-icons/react";
import { useState } from "react";

export default function FilipinosPlayers() {
    const [query, setQuery] = useState("");

    // GET Players
    const [players, setPlayers] = useState<{ id: string; registrationCode: string; name: string; nickname: string; fee: number; isPaid: boolean }[]>([
        { id: "p-01", registrationCode: "1234", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-02", registrationCode: "1235", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-03", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-04", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-05", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-06", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-07", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-08", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-09", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-10", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-11", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { id: "p-12", registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
    ]);

    // POST Players
    function tooglePaid(id: string) {
        setPlayers((ps) => [
            ...ps.map((p) => {
                if (p.id === id) {
                    return { ...p, isPaid: !p.isPaid };
                }
                return { ...p };
            }),
        ]);
    }

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <ScrollArea className={`scroll-smooth transition-all ease-in-out duration-500`}>
                <Main className="w-full lg:max-w-md lg:mx-auto">
                    <h2 className="text-2xl font-semibold -mx-6 -mt-6 pt-6 px-6 bg-background text-foreground">Phillippines - Registered Players</h2>
                    <div className="grid gap-4">
                        <div className="sticky top-0 grid bg-background rounded-b-3xl -mx-6 p-6">
                            <Input value={query} onChange={(e) => setQuery(e.target.value)} clearable placeholder="Search player" />
                        </div>

                        <div className="border border-primary rounded-2xl grid divide-y divide-primary">
                            <div className="grid grid-cols-[4rem_minmax(0,1fr)_4rem] min-h-[3rem] divide-x divide-primary">
                                <span className="px-3 lg:px-4 py-2 flex items-center">Code</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center">Player</span>
                                <span className="px-3 lg:px-4 py-2 flex items-center justify-center">Paid</span>
                            </div>
                            {players.map((player) => (
                                <div key={player.id} className="grid grid-cols-[4rem_minmax(0,1fr)_4rem] min-h-[3rem] divide-x divide-primary font-medium">
                                    <span className="px-3 lg:px-4 py-2 flex items-baseline">{player.registrationCode}</span>
                                    <div className="px-3 lg:px-4 py-2 grid lg:flex lg:justify-between lg:gap-4 items-baseline">
                                        <div className="grid">
                                            <span>{player.name}</span>
                                            {player.nickname !== "" && <small>({player.nickname})</small>}
                                        </div>
                                        <span className="font-mono text-right">
                                            {Intl.NumberFormat("en-US")
                                                .format(Math.ceil(player.fee / 425))
                                                .replaceAll(",", "'")}{" "}
                                            PHP
                                        </span>
                                    </div>
                                    <span className="px-3 lg:px-4 py-2 flex items-center justify-center">
                                        <button
                                            className={`h-6 w-6 rounded ${player.isPaid ? "bg-green-100" : "border-2 border-primary"} grid place-content-center`}
                                            onClick={() => tooglePaid(player.id)}
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

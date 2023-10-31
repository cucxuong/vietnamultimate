"use client";

import PaymentPlayers from "@/components/Admin/PaymentPlayers";
import { useEffect, useState } from "react";
import { getVietnamHatPlayers, updatePaymentStatus } from "@/api/admin/vietnam-hat-2023/players";
import { useRouter } from "next/navigation";

export default function Players() {
    const [players, setPlayers] = useState([]);

    const router = useRouter();

    const fetchPlayers = async () => {
        try {
            // @ts-ignore
            const response = await getVietnamHatPlayers();

            const data = response.data.data;

            const transformedData = data.map((player: any) => {

                return {
                    registrationCode: player.player_code,
                    name: player.full_name,
                    nickname: player.nickname,
                    fee: player.total_fee,
                    isPaid: player.status == "paid",
                };
            });
            // @ts-ignore
            setPlayers([...transformedData]);
        } catch (e: any) {
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

    useEffect(() => {
        console.log(players);
    }, [players]);

    // POST Players
    const tooglePaid = async (code: string, value: boolean) => {

        await updatePaymentStatus({player_code: code});
    }

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <PaymentPlayers items={players} onChange={(code, v) => tooglePaid(code, v)}
                            country={localStorage.getItem("country") ?? ""} />
        </section>
    );
}

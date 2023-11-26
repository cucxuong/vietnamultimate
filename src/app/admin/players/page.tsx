"use client";

import PaymentPlayers from "@/components/Admin/PaymentPlayers";
import { useEffect, useState } from "react";
import { getVietnamHatPlayers, updatePaymentStatus, updatePlayerStatus } from "@/api/admin/vietnam-hat-2023/players";
import { useRouter } from "next/navigation";
import AllRegistration from "@/components/Admin/AllPlayers";
import { PlayerStatus } from "@/utils/vietnam-hat-2023.utils";
import AdminPlayers from "@/components/Admin/AdminPlayers";

export default function Players() {
    const [players, setPlayers] = useState([]);

    const router = useRouter();

    const fetchPlayers = async () => {
        try {
            // @ts-ignore
            const response = await getVietnamHatPlayers();

            const data = response.data.data;

            let transformedData = [];
            if (localStorage.getItem("country") !== "All") {
                transformedData = data.map((player: any) => {
                    const keyStatus: keyof typeof PlayerStatus = player.status.replaceAll("-", "");

                    return {
                        registrationCode: player.player_code,
                        name: player.full_name,
                        nickname: player.nickname,
                        fee: player.total_fee,
                        country: player.current_country,
                        status: PlayerStatus[keyStatus],
                    };
                });
            } else {
                transformedData = data.map((player: any) => {
                    const selectOptions = JSON.parse(player.selected_options);
                    const keyStatus: keyof typeof PlayerStatus = player.status.replaceAll("-", "");

                    return {
                        code: player.player_code,
                        name: player.full_name,
                        email: player.email,
                        nickname: player.nickname,
                        yob: player.year_of_birth,
                        gender: player.gender,
                        country: player?.current_country,
                        totalFee: player.total_fee,
                        status: PlayerStatus[keyStatus],
                        options: selectOptions,
                        createdAt: new Date(player.created_at),
                        updatedAt: new Date(player.updated_at),
                    };
                });
            }

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

    return localStorage.getItem("country") === "All" ? (
        <AllRegistration players={players} />
    ) : localStorage.getItem("country") === "Admin" ? (
        <AdminPlayersWrapper players={players} />
    ) : (
        <CountryPlayers players={players} />
    );
}

const AdminPlayersWrapper = ({ players }: { players: Array<any> }) => {
    const changeStatus = async (code: string, status: PlayerStatus) => {
        await updatePlayerStatus({ player_code: code, status });
    };

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <AdminPlayers
                items={players}
                onChange={(id: string, status: PlayerStatus) => {
                    changeStatus(id, status);
                }}
            />
        </section>
    );
};

const CountryPlayers = ({ players }: { players: Array<any> }) => {
    // POST Players
    const tooglePaid = async (code: string, value: PlayerStatus.paid | PlayerStatus.halfpaid) => {
        //Sửa chỗ này để update statú paid/halfpaid
        await updatePaymentStatus({ player_code: code, status: value });
    };

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <PaymentPlayers items={players} onChange={(code, v) => tooglePaid(code, v)} country={localStorage.getItem("country") ?? ""} />
        </section>
    );
};

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getVietnamHatPlayers } from "@/api/admin/vietnam-hat-2023/players";

const VietnamHat2023 = () => {
    const [players, setPlayers] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            // @ts-ignore
            const response = await getVietnamHatPlayers();

            const data = response.data.data;

            const transformedData = data.map((player: any) => {
                const options = JSON.parse(player.selected_options);

                return {
                    ...player,
                    selected_options: options,
                };
            });

            setPlayers(transformedData);
        } catch (e) {
            console.log(e);
            // @ts-ignore
            if (e.response.status == 401) {
                router.push("/auth/login");
            }
        }

    };


    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th className="px-2">Player Code</th>
                    <th className="px-2">Name</th>
                    <th className="px-2">Info</th>
                    <th className="px-2">Payment Status</th>
                </tr>
                </thead>
                <tbody>
                {players.map(item => (
                    <tr key={`player-${item.player_code}`}>
                        <td className="px-2">{item.player_code}</td>
                        <td className="px-2">{item.full_name}</td>
                        <td className="px-2">{item.full_name}</td>
                        <td className="px-2">{item.status == "paid" ? "Paid" : "Unpaid"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VietnamHat2023;

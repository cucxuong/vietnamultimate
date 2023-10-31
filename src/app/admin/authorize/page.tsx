"use client";

import { useQuery } from "@tanstack/react-query";
import { authorizeCountry, getVietnamHatPlayers } from "@/api/admin/vietnam-hat-2023/players";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Players = () => {

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await authorizeCountry({ code });

            const { country } = response.data.data;

            localStorage.setItem("country", country);
            router.push("/admin/players");
        } catch (e) {
            if (e.response.status === 422) {
                setError("Invalid Code");
            }
        }
    };

    return (
        <>
            <div className="text-center mb-10">Authorize Page</div>

            <div className="flex items-center justify-center">
                <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <input type="text" placeholder="Code" name="code" value={code}
                               onChange={(e) => setCode(e.target.value)} />
                    </div>
                    {error !== "" && <div className="text-rose-700">{error}</div>}
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};


export default Players;

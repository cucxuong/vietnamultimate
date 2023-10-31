"use client";

import { useQuery } from "@tanstack/react-query";
import { authorizeCountry, getVietnamHatPlayers } from "@/api/admin/vietnam-hat-2023/players";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react";

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
        } catch (e:any) {
            if (e.response?.status === 422) {
                setError("Invalid Code");
            }
        }
    };

    return (
        <section className="min-w-[320px] max-w-sm rounded-3xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-foreground dark p-8 grid gap-8">
            <div className="grid place-content-center"><LockKeyhole size={32} strokeWidth={1.5} fill="currentColor" fillOpacity={0.3}/></div>

            <div className="flex items-center justify-center">
                <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)} className="w-full grid gap-4">
                    <Input type="text" placeholder="Passcode" name="code" value={code} onChange={(e) => setCode(e)} />
                    {error !== "" && <div className="text-rose-700">{error}</div>}
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Players;

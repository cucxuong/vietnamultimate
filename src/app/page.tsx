"use client";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import Main from "@/components/Home/Main";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    useEffect(()=>{
        document.querySelector("body")?.classList.add("dark");
        redirect("/tournaments")
    })
    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`} style={{ "--header-h": "5rem" } as React.CSSProperties}>
            <div className="grid grid-rows-[auto_minmax(0,1fr)]">
                {/* <Header /> */}
                <div className="px-8 py-4 lg:py-6 text-xl text-center font-bold">Comming soon...</div>
                {/* <Footer /> */}
            </div>
        </section>
    );
}

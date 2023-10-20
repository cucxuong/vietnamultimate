"use client";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import Main from "@/components/Home/Main";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    useEffect(()=>{
        redirect("/registration")
    })
    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`} style={{ "--header-h": "5rem" } as React.CSSProperties}>
            <div className="overflow-y-auto overflow-x-hidden">
                <Header />
                <Main>Home</Main>
                <Footer />
            </div>
        </section>
    );
}

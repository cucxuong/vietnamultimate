"use client";
import PaymentPlayers from "@/components/Admin/PaymentPlayers";

export default function VietnamPlayers() {
    // GET Players
    const playerList: { registrationCode: string; name: string; nickname: string; fee: number; isPaid: boolean }[] = [
        { registrationCode: "1234", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "1235", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "1236", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "1237", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "1238", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "5365", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "7867", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "2344", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "5646", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "8799", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "0567", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
        { registrationCode: "3556", name: "Cuc Xuong", nickname: "CX", fee: 1610000, isPaid: false },
    ];

    // POST Players
    function tooglePaid(code: string, value: boolean) {
        // Update Reg isPaid
        console.log(`Registration ${code} ${value ? "paid" : "unpaid"}`);
    }

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <PaymentPlayers items={playerList} onChange={(code, v) => tooglePaid(code, v)} country="Vietnam" />
        </section>
    );
}

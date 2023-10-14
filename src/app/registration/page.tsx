"use client";
import Main from "@/components/Home/Main";
import { useState } from "react";

type IndicatorItem = {
    id: number;
    text: string;
};
const Indicator: React.FC<{ className?: string; items: IndicatorItem[]; active: number; onChange: (v: number) => void }> = ({
    className = "",
    items = [{ id: 1, text: "1" }],
    active = "step-1",
    onChange,
}) => {
    return (
        <button className={`flex rounded-full h-12 bg-light bg-opacity-30 backdrop-blur-sm sticky top-6 ${className}`}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`w-full rounded-full bg-light text-on-light flex items-center justify-center transition-all ${
                        item.id === active ? "bg-opacity-100" : "bg-opacity-0 hover:bg-opacity-80"
                    }`}
                    onClick={() => onChange(item.id)}
                >
                    <span className="grid h-6 w-6 place-content-center rounded-full font-bold">{item.text}</span>
                </div>
            ))}
        </button>
    );
};

const steps: IndicatorItem[] = [
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
];

export default function Registration() {
    const [activeStep, setActiveStep] = useState(steps[0].id);
    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden grid-bg`}>
            <div className="overflow-y-auto overflow-x-hidden">
                <Main>
                    <Indicator items={steps} active={activeStep} onChange={(id) => setActiveStep(id)} />
                </Main>
            </div>
        </section>
    );
}

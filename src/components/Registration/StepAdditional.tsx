import { CheckFat } from "@phosphor-icons/react";
import { useEffect } from "react";

export type StepAdditionalData = {
    height: string;
    lunchD1: boolean;
    lunchD2: boolean;
    busD1AM: boolean;
    busD1PM: boolean;
    busD2AM: boolean;
    busD2PM: boolean;
    jerseys: { color: "black" | "white"; size: "s" | "m" | "l" | "xl" | "2xl" | "3xl" }[];
    disc: number;
};
type Props = {
    data: StepAdditionalData;
    validate?: boolean;
    onChange: (d: StepAdditionalData) => void;
    onValidate?: (v: boolean) => void;
};
export default function StepAdditional({ data, validate, onChange, onValidate = (e: boolean) => {} }: Props) {
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    useEffect(() => {
        onValidate(data.height !== "");
    });
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 bg-background grid-bg">Additional</h3>
            <div className="grid gap-2 text-sm lg:gap-0">
                <p>Player fee included: </p>
                <div className="flex flex-wrap justify-center gap-1">
                    <span className="rounded-full h-8 bg-accent text-accent-foreground grid place-content-center px-3">Avenue rental</span>
                    <span className="rounded-full h-8 bg-accent text-accent-foreground grid place-content-center px-3">Water & drinks</span>
                    <span className="rounded-full h-8 bg-accent text-accent-foreground grid place-content-center px-3">Fruits</span>
                    <span className="rounded-full h-8 bg-accent text-accent-foreground grid place-content-center px-3">Medication</span>
                    <span className="rounded-full h-8 bg-accent text-accent-foreground grid place-content-center px-3">Afternoon snacks</span>
                    <div className="w-full"></div>
                    <span className="rounded-full h-8 bg-primary text-primary-foreground grid place-content-center px-3">Lunches</span>
                    <span className="rounded-full h-8 bg-primary text-primary-foreground grid place-content-center px-3">Bus</span>
                    <span className="rounded-full h-8 bg-primary text-primary-foreground grid place-content-center px-3">Jersey</span>
                    <span className="rounded-full h-8 bg-primary text-primary-foreground grid place-content-center px-3">Tournament disc</span>
                </div>
                <p>Last 4 items are optional.</p>
                <p>Please deselect which optional items you prefer to prepare yourself. The fee might be reduced.</p>
            </div>
        </div>
    );
}

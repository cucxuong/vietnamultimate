import { CheckFat } from "@phosphor-icons/react";
import { useEffect } from "react";

export type StepAdditionalData = {
    years: 1 | 2 | 3 | 4 | 5 | "";
    throwing: 1 | 2 | 3 | 4 | 5 | "";
    catching: 1 | 2 | 3 | 4 | 5 | "";
    cutting: 1 | 2 | 3 | 4 | 5 | "";
    defense: 1 | 2 | 3 | 4 | 5 | "";
    fitness: 1 | 2 | 3 | 4 | 5 | "";
    playExp: 1 | 2 | 3 | 4 | 5 | "";
    beACaptain: 1 | 2 | 3 | 4 | "";
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
        onValidate(data.years !== "");
    });
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 bg-background grid-bg">Additional</h3>
            {/* <div className="grid gap-2 text-sm lg:gap-0">
                <p>Please BE HONEST about your so we can place teams that are balanced in level.</p>
            </div> */}
        </div>
    );
}

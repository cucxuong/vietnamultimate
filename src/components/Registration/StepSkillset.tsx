import { CheckFat } from "@phosphor-icons/react";
import { useEffect } from "react";

export type StepSkillsetData = {
    years: string;
    throwing: 1 | 2 | 3 | 4 | 5 | "";
    catching: 1 | 2 | 3 | 4 | 5 | "";
    cutting: 1 | 2 | 3 | 4 | 5 | "";
    defense: 1 | 2 | 3 | 4 | 5 | "";
    playExp: 1 | 2 | 3 | 4 | 5 | "";
};
type Props = {
    data: StepSkillsetData;
    validate?: boolean;
    onChange: (d: StepSkillsetData) => void;
    onValidate?: (v: boolean) => void;
};
export default function StepSkillset({ data, validate, onChange, onValidate = (e: boolean) => {} }: Props) {
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    useEffect(() => {
        onValidate(data.years !== "");
    });
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 bg-dark grid-bg">Ultimate frisbee skillset</h3>
            <div className="grid gap-2 text-sm lg:gap-0">
                <p>Please BE HONEST about your so we can place teams that are balanced in level.</p>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-1">
                <label className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                    <div className="grid">
                        <span className={`text-2xl font-medium ${validate && data.years === "" ? "text-rose-500" : ""}`}>
                            How long have you played Ultimate frisbee? {data.years === "" && <span className="text-rose-500">*</span>}
                        </span>
                    </div>
                    <input
                        value={data.years}
                        onChange={(e) => handleChange("years", e.target.value)}
                        type="text"
                        placeholder={validate && data.years === "" ? "This field is required" : "Example: 1 year 6 months"}
                        className={`bg-dark text-on-dark rounded-md h-12 p-4  ${validate && data.years === "" ? "placeholder:text-rose-500" : "placeholder:opacity-50"}`}
                    />
                </label>
                <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                    <div className="grid">
                        <span className={`text-2xl font-medium ${validate && data.years === "" ? "text-rose-500" : ""}`}>
                            Throwing skill? {data.throwing === "" && <span className="text-rose-500">*</span>}
                        </span>
                    </div>
                    <div className="grid auto-rows-fr rounded-2xl overflow-hidden border border-on-dark border-opacity-30 divide-y divide-on-dark divide-opacity-30">
                        {[
                            { value: 1, label: "Can throw backhand and forehand consistently" },
                            { value: 2, label: "Can throw backhand and forehand consistently if no defender is marking" },
                            { value: 3, label: "Can throw backhand and forehand consistently when a defenderr is marking" },
                            { value: 4, label: "Make decent decisions, can break marks, and handle well" },
                            { value: 5, label: "Make significant decisions, very consitent with all kinds of throws, including hucking" },
                        ].map((item) => (
                            <div key={item.value} className={`min-h-[2.5rem] grid grid-cols-[2.5rem_minmax(0,1fr)] `} onClick={() => handleChange("throwing", item.value)}>
                                <div className={`border-r border-on-dark border-opacity-30 font-semibold grid place-content-center ${item.value === data.throwing ? "bg-light bg-opacity-25" : ""}`}>
                                    {item.value === data.throwing ? <CheckFat size={18} weight="fill" /> : item.value}
                                </div>
                                <div className={`flex items-center px-4 ${item.value === data.throwing ? "bg-light bg-opacity-25" : ""}`}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

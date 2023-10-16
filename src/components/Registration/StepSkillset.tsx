import { CheckFat } from "@phosphor-icons/react";
import { useEffect } from "react";

export type StepSkillsetData = {
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

            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.years === "" ? "text-rose-500" : ""}`}>
                        How long have you played Ultimate frisbee? {data.years === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.years === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.years === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Less than 1 year" },
                        { value: 2, label: "1 - 3 years" },
                        { value: 3, label: "3 - 5 years" },
                        { value: 4, label: "5 - 10 years" },
                        { value: 5, label: "More than 10 years" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("years", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.years ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.years ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.years ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.playExp === "" ? "text-rose-500" : ""}`}>
                        Playing experience? {data.playExp === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.playExp === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.playExp === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Haven't really played much at all" },
                        { value: 2, label: "Played in some regular pick-up games" },
                        { value: 3, label: "Played pick-up quite regularly of played in leagues" },
                        { value: 4, label: "Played on Club teams or played in tournament regularly" },
                        { value: 5, label: "Have been playing for quite sometime and have played at high levels of ultimate" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("playExp", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.playExp ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.playExp ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.playExp ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.throwing === "" ? "text-rose-500" : ""}`}>
                        Throwing skill? {data.throwing === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.throwing === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.throwing === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Can throw backhand and forehand consistently" },
                        { value: 2, label: "Can throw backhand and forehand consistently if no defender is marking" },
                        { value: 3, label: "Can throw backhand and forehand consistently when a defenderr is marking" },
                        { value: 4, label: "Make decent decisions, can break marks, and handle well" },
                        { value: 5, label: "Make significant decisions, very consitent with all kinds of throws, including hucking" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("throwing", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.throwing ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.throwing ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.throwing ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.catching === "" ? "text-rose-500" : ""}`}>
                        Catching skill? {data.catching === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.catching === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.catching === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Have trouble catching a disc even without defender on me" },
                        { value: 2, label: "Can catch a disc when being guarded" },
                        { value: 3, label: "Can read the disc well and have no trouble making catches under pressure" },
                        { value: 4, label: "Can read hucks and I've got good hands under defensive pressure" },
                        { value: 5, label: "Can catch anything under intense pressure in any situation" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("catching", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.catching ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.catching ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.catching ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.cutting === "" ? "text-rose-500" : ""}`}>
                        Cutting skill? {data.cutting === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.cutting === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.cutting === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Develop an understanding of the game, can perform basic straight-line cuts" },
                        { value: 2, label: "Understand the importantce of timing, changing speed and using fakes to get open" },
                        { value: 3, label: "Can make effective undercuts, deep cuts and diagonal cuts to create separation from defenders" },
                        { value: 4, label: "Can execute complex cutting, possess exceptional speed, agility and field awareness" },
                        { value: 5, label: "Can execute a wide range of cuts with precision and exploit defensive weaknesses" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("cutting", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.cutting ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.cutting ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.cutting ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.defense === "" ? "text-rose-500" : ""}`}>
                        Defense skill? {data.defense === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.defense === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.defense === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Do not understand the basics of defense, only know how to mark" },
                        { value: 2, label: "Understand the force" },
                        { value: 3, label: "Understand zone defense and poaching" },
                        { value: 4, label: "Can defend well and understand all defensive strategies" },
                        { value: 5, label: "Can perform all advanced defensive strategies to shutdown offender" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("defense", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.defense ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.defense ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.defense ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.fitness === "" ? "text-rose-500" : ""}`}>
                        Fitness and agility? {data.fitness === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.fitness === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.fitness === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Have weak stamania and speed, can only play a few points" },
                        { value: 2, label: "Have speed, can run in pong points but quickly lost stamania" },
                        { value: 3, label: "Have endurance and quickness" },
                        { value: 4, label: "Have speed, ability to change direction rapidly and stability" },
                        { value: 5, label: "Have exceptional fitness and agility, can stay for the whole game" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("fitness", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.fitness ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.fitness ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.fitness ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-2xl snap-start rounded-2xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.beACaptain === "" ? "text-rose-500" : ""}`}>
                        Are you interested in the captain position or wish to be a captain? {data.beACaptain === "" && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.beACaptain === "" && <span className="text-rose-500">Please select one answer below</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-30 divide-y divide-on-dark divide-opacity-30 ${
                        validate && data.beACaptain === "" ? "border-rose-500" : "border-on-dark"
                    }`}
                >
                    {[
                        { value: 1, label: "Yes" },
                        { value: 2, label: "No" },
                        { value: 3, label: "I can try" },
                        { value: 4, label: "If I'm the only choice" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-on-dark divide-opacity-30`}
                            onClick={() => handleChange("beACaptain", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center ${item.value === data.beACaptain ? "bg-light bg-opacity-30" : ""}`}>
                                {item.value === data.beACaptain ? <CheckFat size={18} weight="fill" /> : item.value}
                            </div>
                            <div className={`flex items-center px-4 ${item.value === data.beACaptain ? "bg-light bg-opacity-30" : ""}`}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

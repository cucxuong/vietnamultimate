import { useAppTranslation } from "@/i18n/client";
import { CheckFat } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Input } from "../ui/input";

export type StepSkillsetData = {
    years: 1 | 2 | 3 | 4 | 5 | 0;
    throwing: 1 | 2 | 3 | 4 | 5 | 0;
    catching: 1 | 2 | 3 | 4 | 5 | 0;
    cutting: 1 | 2 | 3 | 4 | 5 | 0;
    defense: 1 | 2 | 3 | 4 | 5 | 0;
    fitness: 1 | 2 | 3 | 4 | 5 | 0;
    playExp: 1 | 2 | 3 | 4 | 5 | 0;
    beACaptain: 1 | 2 | 3 | 4 | 0;
    team?:string;
};
type Props = {
    data: StepSkillsetData;
    validate?: boolean;
    onChange: (d: StepSkillsetData) => void;
    onValidate?: (v: boolean) => void;
};
export default function StepSkillset({ data, validate, onChange, onValidate = (e: boolean) => {} }: Props) {
    const { t, i18n } = useAppTranslation();
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    useEffect(() => {
        onValidate(
            data.years >0 && data.throwing >0 && data.catching >0 && data.cutting >0 && data.defense >0 && data.fitness >0 && data.playExp >0 && data.beACaptain >0,
        );
    });
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 pb-4 bg-background grid-bg">{t("Ultimate frisbee skillset")}</h3>
            <div className="grid gap-2 text-sm lg:text-base lg:gap-0 -mt-4">
                <p>{t("Please BE HONEST about your so we can place teams that are balanced in level.")}</p>
            </div>

            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.years === 0 ? "text-rose-500" : ""}`}>
                        {t("How long have you played Ultimate frisbee?")} {data.years === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.years === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.years === 0 ? "border-rose-500" : "border-foreground"
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
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.years ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("years", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.years ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.playExp === 0 ? "text-rose-500" : ""}`}>
                        {t("Playing experience?")} {data.playExp === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.playExp === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.playExp === 0 ? "border-rose-500" : "border-foreground"
                    }`}
                >
                    {[
                        { value: 1, label: "Haven't really played much at all" },
                        { value: 2, label: "Played in some regular pick-up games" },
                        { value: 3, label: "Played pick-up quite regularly or played in leagues" },
                        { value: 4, label: "Played on Club teams or played in tournament regularly" },
                        { value: 5, label: "Have been playing for quite sometime and have played at high levels of ultimate" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.playExp ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("playExp", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.playExp ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6 rounded-3xl`}>
                <span className="text-2xl font-medium">{t("What Team/Club are you playing for?")}</span>
                <Input value={data.team} onChange={(e) => handleChange("allergies", e.target.value)} clearable placeholder={t("Your answer") || ""} />
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.throwing === 0 ? "text-rose-500" : ""}`}>
                        {t("Throwing skill?")} {data.throwing === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.throwing === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.throwing === 0 ? "border-rose-500" : "border-foreground"
                    }`}
                >
                    {[
                        { value: 1, label: "Can throw backhand and forehand consistently" },
                        { value: 2, label: "Can throw backhand and forehand consistently if no defender is marking" },
                        { value: 3, label: "Can throw backhand and forehand consistently when a defender is marking" },
                        { value: 4, label: "Make decent decisions, can break marks, and handle well" },
                        { value: 5, label: "Make significant decisions, very consitent with all kinds of throws, including hucking" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.throwing ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("throwing", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.throwing ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.catching === 0 ? "text-rose-500" : ""}`}>
                        {t("Catching skill?")} {data.catching === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.catching === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.catching === 0 ? "border-rose-500" : "border-foreground"
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
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.catching ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("catching", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.catching ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.cutting === 0 ? "text-rose-500" : ""}`}>
                        {t("Cutting skill?")} {data.cutting === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.cutting === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.cutting === 0 ? "border-rose-500" : "border-foreground"
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
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.cutting ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("cutting", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.cutting ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.defense === 0 ? "text-rose-500" : ""}`}>
                        {t("Defense skill?")} {data.defense === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.defense === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.defense === 0 ? "border-rose-500" : "border-foreground"
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
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.defense ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("defense", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.defense ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.fitness === 0 ? "text-rose-500" : ""}`}>
                        {t("Fitness and agility?")} {data.fitness === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.fitness === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.fitness === 0 ? "border-rose-500" : "border-foreground"
                    }`}
                >
                    {[
                        { value: 1, label: "Have weak stamina and speed, can only play a few points" },
                        { value: 2, label: "Have speed, can run in pong points but quickly lost stamina" },
                        { value: 3, label: "Have endurance and quickness" },
                        { value: 4, label: "Have speed, ability to change direction rapidly and stability" },
                        { value: 5, label: "Have exceptional fitness and agility, can stay for the whole game" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.fitness ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("fitness", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.fitness ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 content-between gap-4 bg-foreground bg-opacity-5 backdrop-blur-2xl snap-start rounded-3xl p-4 lg:p-6">
                <div className="grid">
                    <span className={`text-2xl font-medium ${validate && data.beACaptain === 0 ? "text-rose-500" : ""}`}>
                        {t("Are you interested in the captain position or wish to be a captain?")} {data.beACaptain === 0 && <span className="text-rose-500">*</span>}
                    </span>
                    {validate && data.beACaptain === 0 && <span className="text-rose-500">{t("Please select one answer below")}</span>}
                </div>
                <div
                    className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                        validate && data.beACaptain === 0 ? "border-rose-500" : "border-foreground"
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
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                item.value === data.beACaptain ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => handleChange("beACaptain", item.value)}
                        >
                            <div className={`font-semibold grid place-content-center`}>{item.value === data.beACaptain ? <CheckFat size={18} weight="fill" /> : item.value}</div>
                            <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useAppTranslation } from "@/i18n/client";
import { CheckFat } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { StepGeneralData } from "./StepGeneral";
import { StepSkillsetData } from "./StepSkillset";
import { StepAdditionalData } from "./StepAdditional";

export type StepFinishData = {};
type Props = {
    dataGeneral: StepGeneralData;
    dataSkillset: StepSkillsetData;
    dataAdditional: StepAdditionalData;
};
export default function StepFinish({ dataGeneral, dataSkillset, dataAdditional }: Props) {
    const { t, i18n } = useAppTranslation();
    const pts = Math.round((dataSkillset.years + dataSkillset.throwing + dataSkillset.playExp + dataSkillset.fitness + dataSkillset.defense + dataSkillset.cutting + dataSkillset.catching) / 7);
    const [avgPoint, setAvgPoint] = useState(0);
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 bg-background grid-bg text-balance">{t("Review your information")}</h3>
            <div className="grid grid-cols-1 border rounded-3xl divide-y overflow-hidden bg-background bg-opacity-5 backdrop-blur">
                <div className="p-4 lg:p-6">
                    <div className="grid">
                        <span className="capitalize text-2xl font-medium">{dataGeneral.name}</span>
                        <span>
                            {dataGeneral.stayingCountry} {dataGeneral.isStudent && <span>({t("Student")})</span>}
                        </span>
                        <span>{dataGeneral.yob}</span>
                        <span>{dataGeneral.email}</span>
                    </div>
                </div>

                <div className="col-span-full p-4 lg:p-6 bg-background text-foreground grid gap-2 invert">
                    <span className="text-2xl font-medium">{t("Your fee")}</span>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>
                            {t("Base")}{" "}
                            <span className="text-xs">
                                ({t("Field")}, {t("Medic & First Aid")}, {t("Beverage & electrolytes")}, {t("Fruits & Snack")})
                            </span>
                        </span>
                        <span>$30</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>{t("Lunch")}</span>
                        <span>${dataAdditional.lunch ? 9 : 0}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>{t("Shuttle Bus")}</span>
                        <span>${dataAdditional.bus ? 11 : 0}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>
                            {t("Jersey")} (
                            <span className="text-xs">
                                {t("Black")} x {dataAdditional.jerseys.filter((j) => j.color === "black").length}
                            </span>
                            {", "}
                            <span className="text-xs">
                                {t("White")} x {dataAdditional.jerseys.filter((j) => j.color === "white").length}
                            </span>
                            )
                        </span>
                        <span>${dataAdditional.jerseys.length * 6}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>
                            {t("Shorts")} (
                            <span className="text-xs">
                                {t("Black")} x {dataAdditional.shorts.filter((j) => j.color === "black").length}
                            </span>
                            {", "}
                            <span className="text-xs">
                                {t("White")} x {dataAdditional.shorts.filter((j) => j.color === "white").length}
                            </span>
                            )
                        </span>
                        <span>${dataAdditional.shorts.length * 3}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>
                            {t("Disc")} x {dataAdditional.disc}
                        </span>
                        <span>${dataAdditional.disc * 10}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 border-t pt-2 text-2xl font-semibold">
                        <span>{t("Total")}</span>
                        <span className="font-mono">
                            ${30 + (dataAdditional.lunch ? 9 : 0) + (dataAdditional.bus ? 11 : 0) + dataAdditional.jerseys.length * 6 + dataAdditional.shorts.length * 3 + dataAdditional.disc * 10}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

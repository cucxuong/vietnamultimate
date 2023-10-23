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
            <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-3xl p-4 lg:p-6">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)]">
                        <span className="capitalize text-xl font-medium">❤️</span>{" "}
                        <span className="capitalize text-xl font-medium">
                            {dataGeneral.name} ({dataGeneral.yob})
                        </span>
                        <span className="capitalize text-xl font-medium"></span>
                        <span>{dataGeneral.email}</span>
                    </div>
                </div>
                <div className="border rounded-3xl p-4 lg:p-6 flex items-center justify-center text-5xl">{pts}</div>
            </div>
        </div>
    );
}

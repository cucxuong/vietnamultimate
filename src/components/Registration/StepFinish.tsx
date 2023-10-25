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
    const [fee, setFee] = useState(
        700000 +
            (dataAdditional.lunch ? 170000 : 0) +
            (dataAdditional.bus ? 200000 : 0) +
            dataAdditional.jerseys.length * 170000 +
            dataAdditional.shorts.length * 200000 +
            dataAdditional.disc * 200000,
    );
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 bg-background grid-bg text-balance">{t("Review your information")}</h3>
            <div className="grid grid-cols-1 border rounded-3xl divide-y overflow-hidden bg-background bg-opacity-5 backdrop-blur">
                <div className="p-4 lg:p-6">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2">
                        <span className="capitalize text-2xl font-medium col-span-full">{dataGeneral.name}</span>

                        <span>{t("From")}</span>
                        <span>
                            {dataGeneral.stayingCountry} {dataGeneral.isStudent && <span>({t("Student")})</span>}
                        </span>

                        <span>YOB</span>
                        <span>{dataGeneral.yob}</span>

                        <span>Email</span>
                        <span>{dataGeneral.email}</span>
                    </div>
                </div>

                <div className="col-span-full p-4 lg:p-6 bg-background text-foreground grid gap-2 invert">
                    <span className="text-2xl font-medium">{t("Your fee")}</span>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>{t("Base")}</span>
                        <span className="font-mono">{Intl.NumberFormat("en-US").format(700000).replaceAll(",", "'")} VND</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>{t("Lunch")}</span>
                        <span className="font-mono">
                            {Intl.NumberFormat("en-US")
                                .format(dataAdditional.lunch ? 170000 : 0)
                                .replaceAll(",", "'")}{" "}
                            VND
                        </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>{t("Shuttle Bus")}</span>
                        <span className="font-mono">
                            {Intl.NumberFormat("en-US")
                                .format(dataAdditional.bus ? 200000 : 0)
                                .replaceAll(",", "'")}{" "}
                            VND
                        </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>
                            {dataAdditional.jerseys.length} x {t("Jersey")}
                        </span>
                        <span className="font-mono">
                            {Intl.NumberFormat("en-US")
                                .format(dataAdditional.jerseys.length * 170000)
                                .replaceAll(",", "'")}{" "}
                            VND
                        </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>
                            {dataAdditional.shorts.length} x {t("Shorts")}
                        </span>
                        <span className="font-mono">
                            {Intl.NumberFormat("en-US")
                                .format(dataAdditional.shorts.length * 200000)
                                .replaceAll(",", "'")}{" "}
                            VND
                        </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pl-6 opacity-80">
                        <span>
                            {dataAdditional.disc} x {t("Disc")}
                        </span>
                        <span className="font-mono">
                            {Intl.NumberFormat("en-US")
                                .format(dataAdditional.disc * 200000)
                                .replaceAll(",", "'")}{" "}
                            VND
                        </span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] justify-between items-baseline gap-x-4 border-t pt-2 text-2xl font-semibold">
                        <span>{t("Total")}</span>

                        <span className={`text-right font-mono ${dataGeneral.stayingCountry === "Vietnam" ? "" : "text-base opacity-80 font-medium"}`}>
                            {Intl.NumberFormat("en-US").format(fee).replaceAll(",", "'")} VND
                        </span>

                        {dataGeneral.stayingCountry !== "Vietnam" && (
                            <span className="text-sm opacity-80 font-medium">
                                (
                                {dataGeneral.stayingCountry === "Singapore"
                                    ? "1 SGD = 17'500 VND"
                                    : dataGeneral.stayingCountry === "Malaysia"
                                    ? "1 MYR = 5'145 VND"
                                    : dataGeneral.stayingCountry === "Philippines"
                                    ? "1 PHP = 425 VND"
                                    : "1 USD = 24'500 VND"}
                                )
                            </span>
                        )}

                        {dataGeneral.stayingCountry === "Singapore" && (
                            <span className="text-right">
                                <span className="font-sans font-medium">≈ </span>
                                {Intl.NumberFormat("en-US")
                                    .format(Math.ceil(fee / 17500))
                                    .replaceAll(",", "'")}{" "}
                                SGD
                            </span>
                        )}
                        {dataGeneral.stayingCountry === "Malaysia" && (
                            <span className="text-right">
                                <span className="font-sans font-medium">≈ </span>
                                {Intl.NumberFormat("en-US")
                                    .format(Math.ceil(fee / 5145))
                                    .replaceAll(",", "'")}{" "}
                                MYR
                            </span>
                        )}
                        {dataGeneral.stayingCountry === "Philippines" && (
                            <span className="text-right">
                                <span className="font-sans font-medium">≈ </span>
                                {Intl.NumberFormat("en-US")
                                    .format(Math.ceil(fee / 425))
                                    .replaceAll(",", "'")}{" "}
                                PHP
                            </span>
                        )}
                        {dataGeneral.stayingCountry !== "Vietnam" &&
                            dataGeneral.stayingCountry !== "Singapore" &&
                            dataGeneral.stayingCountry !== "Malaysia" &&
                            dataGeneral.stayingCountry !== "Philippines" && (
                                <span className="text-right">
                                    <span className="font-sans font-medium">≈ </span>
                                    {Intl.NumberFormat("en-US")
                                        .format(Math.ceil(fee / 24500))
                                        .replaceAll(",", "'")}{" "}
                                    USD
                                </span>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

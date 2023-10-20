import { useAppTranslation } from "@/i18n/client";
import { CheckFat } from "@phosphor-icons/react";
import { useEffect } from "react";

export type StepFinishData = {
};
type Props = {
    // data: StepFinishData;
    // validate?: boolean;
    // onChange: (d: StepFinishData) => void;
    // onValidate?: (v: boolean) => void;
};
export default function StepFinish() {
    const { t, i18n } = useAppTranslation();
    // const handleChange = (prop: string, value: any) => {
    //     onChange({ ...data, [prop]: value });
    // };
    // useEffect(() => {
    //     onValidate(data !== "");
    // });
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 bg-background grid-bg text-balance">{t("Review your information")}</h3>
            {/* <div className="grid gap-2 text-sm lg:gap-0">
                <p>Please BE HONEST about your so we can place teams that are balanced in level.</p>
            </div> */}
        </div>
    );
}

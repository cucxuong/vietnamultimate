import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppTranslation } from "@/i18n/client";
import { Transition } from "@headlessui/react";
import { CheckFat, X } from "@phosphor-icons/react";
import { InputMask } from "@react-input/mask";
import { Fragment, useEffect, useState } from "react";

export type StepGeneralData = {
    name: string;
    nickname: string;
    yob: string;
    gender: "male" | "female";
    email: string;
    stayingCountry: string;
    isStudent: boolean;
};
type Props = {
    data: StepGeneralData;
    validate?: boolean;
    onChange: (d: StepGeneralData) => void;
    onValidate?: (v: boolean) => void;
};
export default function StepGeneral({ data, validate, onChange, onValidate = (e: boolean) => {} }: Props) {
    const { t, i18n } = useAppTranslation();
    const [otherCountry, setOtherCountry] = useState(false);
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    function toLowerCaseNonAccentVietnamese(str: string) {
        str = str.toLowerCase();
        //     We can also use this instead of from line 11 to line 17
        //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
        //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
        //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
        //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
        //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
        //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
        //     str = str.replace(/\u0111/g, "d");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }
    function isValidEmail(email: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    useEffect(() => {
        onValidate(data.name !== "" && data.yob !== "" && data.email !== "" && data.stayingCountry !== "");
    });
    return (
        <div className="flex flex-col gap-6 -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 pb-4 bg-background grid-bg">{t("General information")}</h3>
            <div className="grid gap-2 text-sm lg:text-base lg:gap-0 -mt-4">
                <p>{t("Please provide the correct information so we can contact you properly.")}</p>
                <p>{t("The information provided will be used for registration purposes and to communicate important updates regarding the tournament.")}</p>
                <p>{t("Your privacy is important to us, and the information provided will be handled in accordance with our privacy policy.")}</p>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded-3xl p-4 lg:p-6">
                    <span className={`text-2xl font-medium ${validate && (data.email === "" || !isValidEmail(data.email)) ? "text-rose-500 snap-start" : ""}`}>
                        {t("Email")} {data.email === "" && <span className="text-rose-500">*</span>}
                    </span>
                    <Input
                        value={data.email}
                        clearable
                        onChange={(e) => handleChange("email", e)}
                        type="email"
                        inputMode="email"
                        placeholder={validate && data.email === "" ? t("This field is required") || "" : t("Your answer") || ""}
                        className={`bg-background text-foreground rounded-md h-12 p-4  ${validate && data.email === "" ? "placeholder:text-rose-500" : "placeholder:opacity-50"}`}
                    />
                    {data.email !== "" && !isValidEmail(data.email) && <span className="text-rose-500">{t("You have entered an invalid email address!")}</span>}
                </label>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded-t-3xl rounded lg:rounded-tr p-4 lg:p-6">
                    <span className={`text-2xl font-medium ${validate && data.name === "" ? "text-rose-500 snap-start" : ""}`}>
                        {t("Full name")} {data.name === "" && <span className="text-rose-500">*</span>}
                    </span>
                    <Input
                        value={data.name}
                        clearable
                        onChange={(e) => handleChange("name", e)}
                        type="text"
                        placeholder={validate && data.name === "" ? t("This field is required") || "" : t("Your answer") || ""}
                        className={`bg-background text-foreground rounded-md h-12 p-4  ${validate && data.name === "" ? "placeholder:text-rose-500" : "placeholder:opacity-50"}`}
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded lg:rounded-tr-3xl p-4 lg:p-6">
                    <div className="grid">
                        <span className="text-2xl font-medium">{t("Nickname")}</span>
                    </div>
                    <Input
                        value={data.nickname}
                        clearable
                        onChange={(e) => handleChange("nickname", e)}
                        type="text"
                        placeholder={t("Which everyone could conveniently call you") || ""}
                        className="placeholder:opacity-50"
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded lg:rounded-bl-3xl p-4 lg:p-6">
                    <span className={`text-2xl font-medium ${validate && !data.yob ? "text-rose-500 snap-start" : ""}`}>
                        {t("Year of birth")} {!data.yob && <span className="text-rose-500">*</span>}
                    </span>
                    <div className="relative inline-grid grid-cols-1">
                        <InputMask
                            mask="a___"
                            replacement={{ a: /[1-2]/, _: /\d/ }}
                            value={data.yob}
                            inputMode="numeric"
                            onChange={(e) => handleChange("yob", e.target.value)}
                            placeholder="YYYY"
                            className="appearance-none flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:opacity-50"
                        />
                        {data.yob && (
                            <Button
                                variant={"ghost"}
                                size={"icon-xs"}
                                tabIndex={-1}
                                className="rounded-full absolute top-1/2 -translate-y-1/2 right-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChange("yob", "");
                                }}
                            >
                                <span>
                                    <X size={16} weight="bold" />
                                </span>
                            </Button>
                        )}
                    </div>
                </label>
                <div className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded rounded-b-3xl lg:rounded-bl p-4 lg:p-6">
                    <span className="text-2xl font-medium">
                        {t("Gender")} {data.gender !== "female" && data.gender !== "male" && <span className="text-rose-500 snap-start">*</span>}
                    </span>
                    <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-60 h-12">
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                data.gender === "female" ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                            }`}
                            onClick={() => handleChange("gender", "female")}
                        >
                            {data.gender === "female" && (
                                <span>
                                    <CheckFat size={18} weight="fill" />
                                </span>
                            )}
                            <span>{t("Female")}</span>
                        </button>
                        <div className="border-l border-foreground border-opacity-60"></div>
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                data.gender === "male" ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                            }`}
                            onClick={() => handleChange("gender", "male")}
                        >
                            {data.gender === "male" && (
                                <span>
                                    <CheckFat size={18} weight="fill" />
                                </span>
                            )}
                            <span>{t("Male")}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`grid gap-0.5`}>
                <label
                    className={`grid grid-cols-1 content-start gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl p-4 lg:p-6 transition-all ${
                        toLowerCaseNonAccentVietnamese(data.stayingCountry.replace(/\W/g, "").toLowerCase()) === "vietnam" ? "rounded rounded-t-3xl" : "rounded-3xl"
                    }`}
                >
                    <span className={`text-2xl font-medium ${validate && !data.stayingCountry ? "text-rose-500 snap-start" : ""}`}>
                        {t("Which country are you staying?")} {!data.stayingCountry && <span className="text-rose-500">*</span>}
                    </span>
                    <div
                        className={`grid auto-rows-fr rounded-2xl overflow-hidden border border-opacity-60 divide-y divide-foreground divide-opacity-60 ${
                            validate && data.stayingCountry === "" ? "border-rose-500" : "border-foreground"
                        }`}
                    >
                        {[
                            { value: 1, label: "Cambodia" },
                            { value: 2, label: "Malaysia" },
                            { value: 3, label: "Philippines" },
                            { value: 4, label: "Singapore" },
                            { value: 5, label: "Vietnam" },
                        ].map((item) => (
                            <div
                                key={item.value}
                                className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                    item.label === data.stayingCountry ? "bg-foreground bg-opacity-30" : ""
                                }`}
                                onClick={() => {
                                    setOtherCountry(false);
                                    handleChange("stayingCountry", item.label);
                                }}
                            >
                                <div className={`font-semibold grid place-content-center`}>{item.label === data.stayingCountry ? <CheckFat size={18} weight="fill" /> : ""}</div>
                                <div className={`flex items-center px-4 py-2`}>{t(item.label)}</div>
                            </div>
                        ))}
                        <div
                            className={`min-h-[3rem] grid grid-cols-[3rem_minmax(0,1fr)] divide-x divide-foreground divide-opacity-60 cursor-pointer select-none ${
                                otherCountry ? "bg-foreground bg-opacity-30" : ""
                            }`}
                            onClick={() => {
                                if (!otherCountry) {
                                    setOtherCountry(true);
                                    handleChange("stayingCountry", "");
                                }
                            }}
                        >
                            <div className={`font-semibold grid place-content-center`}>{otherCountry ? <CheckFat size={18} weight="fill" /> : ""}</div>
                            <div className={`flex items-center px-4 py-2`}>{t("Other")}</div>
                        </div>
                    </div>
                    <Transition
                        show={otherCountry}
                        as={Fragment}
                        enter="transition-all ease-in duration-200"
                        leave="transition-all ease-out duration-100"
                        enterFrom="-translate-y-6 opacity-0"
                        leaveTo="translate-y-1/2 opacity-0"
                    >
                        <Input
                            value={data.stayingCountry}
                            clearable
                            onChange={(e) => handleChange("stayingCountry", e)}
                            type="text"
                            placeholder={t("Your answer") || ""}
                            className="bg-background text-foreground rounded-md h-12 p-4 placeholder:opacity-50"
                        />
                    </Transition>
                </label>
                <Transition
                    show={toLowerCaseNonAccentVietnamese(data.stayingCountry.replace(/\W/g, "").toLowerCase()) === "vietnam"}
                    as={Fragment}
                    enter="transition-all ease-in duration-200"
                    leave="transition-all ease-out duration-100"
                    enterFrom="-translate-y-6 opacity-0"
                    leaveTo="translate-y-1/2 opacity-0"
                >
                    <div className={`grid grid-cols-1 content-start gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded rounded-b-3xl p-4 lg:p-6`}>
                        <span className={`text-2xl font-medium`}>{t("Are you a high school/college student?")}</span>
                        <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                            <button
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${data.isStudent ? "bg-primary bg-opacity-30 duration-200" : "duration-100"}`}
                                onClick={() => handleChange("isStudent", true)}
                            >
                                {data.isStudent && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <span>{t("Yes")}</span>
                            </button>
                            <div className="border-l border-foreground border-opacity-60"></div>
                            <button
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                    !data.isStudent ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                }`}
                                onClick={() => handleChange("isStudent", false)}
                            >
                                {!data.isStudent && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <span>{t("No")}</span>
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
}

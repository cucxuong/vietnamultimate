import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarBlank, CheckFat, X } from "@phosphor-icons/react";
import { format } from "date-fns";
import { useEffect } from "react";
import { InputMask } from "@react-input/mask";

export type StepGeneralData = {
    name: string;
    nickname: string;
    yob: string;
    gender: "male" | "female";
    email: string;
    nationality: string;
    stayingCountry: string;
};
type Props = {
    data: StepGeneralData;
    validate?: boolean;
    onChange: (d: StepGeneralData) => void;
    onValidate?: (v: boolean) => void;
};
export default function StepGeneral({ data, validate, onChange, onValidate = (e: boolean) => {} }: Props) {
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    useEffect(() => {
        onValidate(data.name !== "" && data.yob !== "" && data.email !== "");
    });
    return (
        <div className="flex flex-col gap-6 -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 pt-12 pb-4 bg-background grid-bg">General information</h3>
            <div className="grid gap-2 text-sm lg:text-base lg:gap-0 -mt-4">
                <p>Please provide the correct information so we can contact you properly.</p>
                <p>The information provided will be used for registration purposes and to communicate important updates regarding the tournament.</p>
                <p>Your privacy is important to us, and the information provided will be handled in accordance with our privacy policy.</p>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded-2xl p-4 lg:p-6">
                    <span className={`text-2xl font-medium ${validate && data.email === "" ? "text-rose-500 snap-start" : ""}`}>
                        Email {data.email === "" && <span className="text-rose-500">*</span>}
                    </span>
                    <Input
                        value={data.email}
                        clearable
                        onChange={(e) => handleChange("email", e)}
                        type="email"
                        inputMode="email"
                        placeholder={validate && data.email === "" ? "This field is required" : "Your answer"}
                        className={`bg-background text-foreground rounded-md h-12 p-4  ${validate && data.email === "" ? "placeholder:text-rose-500" : "placeholder:opacity-50"}`}
                    />
                </label>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded-t-2xl rounded lg:rounded-tr p-4 lg:p-6">
                    <span className={`text-2xl font-medium ${validate && data.name === "" ? "text-rose-500 snap-start" : ""}`}>
                        Full name{data.name === "" && <span className="text-rose-500">*</span>}
                    </span>
                    <Input
                        value={data.name}
                        clearable
                        onChange={(e) => handleChange("name", e)}
                        type="text"
                        placeholder={validate && data.name === "" ? "This field is required" : "Your answer"}
                        className={`bg-background text-foreground rounded-md h-12 p-4  ${validate && data.name === "" ? "placeholder:text-rose-500" : "placeholder:opacity-50"}`}
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded lg:rounded-tr-2xl p-4 lg:p-6">
                    <div className="grid">
                        <span className="text-2xl font-medium">Nickname</span>
                    </div>
                    <Input
                        value={data.nickname}
                        clearable
                        onChange={(e) => handleChange("nickname", e)}
                        type="text"
                        placeholder="Which everyone could conveniently call you"
                        className="placeholder:opacity-50"
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded lg:rounded-bl-2xl p-4 lg:p-6">
                    <span className={`text-2xl font-medium ${validate && !data.yob ? "text-rose-500 snap-start" : ""}`}>Year of birth{!data.yob && <span className="text-rose-500">*</span>}</span>
                    <div className="relative inline-grid grid-cols-1">
                        <InputMask
                            mask="a___"
                            replacement={{ a: /[1-2]/, _: /\d/ }}
                            value={data.yob}
                            inputMode="numeric"
                            onMask={(e) => handleChange("yob", e.detail.value)}
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
                <div className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded rounded-b-2xl lg:rounded-bl p-4 lg:p-6">
                    <span className="text-2xl font-medium">Gender{data.gender !== "female" && data.gender !== "male" && <span className="text-rose-500 snap-start">*</span>}</span>
                    <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-30 h-12">
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
                            <span>Female</span>
                        </button>
                        <div className="border-l border-foreground border-opacity-30"></div>
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
                            <span>Male</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded rounded-t-2xl lg:rounded-tr lg:rounded-l-2xl p-4 lg:p-6">
                    <span className="text-2xl font-medium">Nationality</span>
                    <Input
                        value={data.nationality}
                        clearable
                        onChange={(e) => {
                            handleChange("nationality", e);
                        }}
                        type="text"
                        placeholder="Your answer"
                        className="bg-background text-foreground rounded-md h-12 p-4 placeholder:opacity-50"
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded rounded-b-2xl lg:rounded-bl lg:rounded-r-2xl p-4 lg:p-6">
                    <span className="text-2xl font-medium">Which country are you staying?</span>
                    <Input
                        value={data.stayingCountry}
                        clearable
                        onChange={(e) => handleChange("stayingCountry", e)}
                        onFocus={() => {
                            if (data.stayingCountry === "" && data.nationality) {
                                handleChange("stayingCountry", data.nationality);
                            }
                        }}
                        type="text"
                        placeholder="Your answer"
                        className="bg-background text-foreground rounded-md h-12 p-4 placeholder:opacity-50"
                    />
                </label>
            </div>
        </div>
    );
}

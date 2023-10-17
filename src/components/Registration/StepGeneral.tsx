import { Button } from "@/components/ui/button";
import { CheckFat, X } from "@phosphor-icons/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect } from "react";

export type StepGeneralData = {
    name: string;
    nickname: string;
    dob: Date | undefined;
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
        onValidate(data.name !== "" && data.dob !== undefined && data.email !== "");
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
                    <input
                        value={data.email}
                        onChange={(e) => handleChange("email", e.target.value)}
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
                    <input
                        value={data.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        type="text"
                        placeholder={validate && data.name === "" ? "This field is required" : "Your answer"}
                        className={`bg-background text-foreground rounded-md h-12 p-4  ${validate && data.name === "" ? "placeholder:text-rose-500" : "placeholder:opacity-50"}`}
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded lg:rounded-tr-2xl p-4 lg:p-6">
                    <div className="grid">
                        <span className="text-2xl font-medium">Nickname</span>
                        {/* <span className="text-sm opacity-50">Which everyone could conveniently call you</span> */}
                    </div>
                    <input
                        value={data.nickname}
                        onChange={(e) => handleChange("nickname", e.target.value)}
                        type="text"
                        placeholder="Which everyone could conveniently call you"
                        className="bg-background text-foreground rounded-md h-12 p-4 placeholder:opacity-50"
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded lg:rounded-bl-2xl p-4 lg:p-6">
                    <span className={`text-2xl font-medium ${validate && !data.dob ? "text-rose-500 snap-start" : ""}`}>Date of birth{!data.dob && <span className="text-rose-500">*</span>}</span>
                    <div className="relative grid">
                        <input
                            onFocus={(e) => e.target.showPicker()}
                            onChange={(e) => handleChange("dob", e.target.valueAsDate)}
                            type="date"
                            placeholder={validate && !data.dob ? "This field is required" : "DD.MM.YYYY"}
                            className={`appearance-none h-12 p-4 opacity-0 ${validate && !data.dob ? "placeholder:text-rose-500" : "placeholder:opacity-50"}`}
                        />
                        <span
                            className={`absolute inset-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground justify-start text-left font-normal inline-flex items-center rounded-md text-base ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 ${
                                validate && !data.dob ? "text-rose-500" : ""
                            }`}
                        >
                            <span className="mr-auto">
                                {data.dob ? (
                                    format(data.dob, "dd.MM.yyyy")
                                ) : (
                                    <span className={`${validate && !data.dob ? "text-rose-500" : "text-[#9ca3af] opacity-50"}`}>
                                        {validate && !data.dob ? "This field is required" : "DD.MM.YYYY"}
                                    </span>
                                )}
                            </span>
                        </span>
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 h-5 z-10">
                            {data.dob ? (
                                <Button
                                    variant={"ghost"}
                                    size={"icon-xs"}
                                    className="rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleChange("dob", null);
                                    }}
                                >
                                    <span>
                                        <X size={16} weight="bold" />
                                    </span>
                                </Button>
                            ) : (
                                <CalendarIcon size={18} className="text-inherit opacity-30" />
                            )}
                        </div>
                    </div>
                </label>
                <div className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded rounded-b-2xl lg:rounded-bl p-4 lg:p-6">
                    <span className="text-2xl font-medium">Gender{data.gender !== "female" && data.gender !== "male" && <span className="text-rose-500 snap-start">*</span>}</span>
                    <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-30 h-12">
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                data.gender === "female" ? "bg-foreground bg-opacity-30 duration-200" : "duration-100"
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
                                data.gender === "male" ? "bg-foreground bg-opacity-30 duration-200" : "duration-100"
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
                    <input
                        value={data.nationality}
                        onChange={(e) => {
                            handleChange("nationality", e.target.value);
                        }}
                        type="text"
                        placeholder="Your answer"
                        className="bg-background text-foreground rounded-md h-12 p-4 placeholder:opacity-50"
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-card-foreground bg-opacity-5 backdrop-blur-2xl rounded rounded-b-2xl lg:rounded-bl lg:rounded-r-2xl p-4 lg:p-6">
                    <span className="text-2xl font-medium">Which country are you staying?</span>
                    <input
                        value={data.stayingCountry}
                        onChange={(e) => handleChange("stayingCountry", e.target.value)}
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

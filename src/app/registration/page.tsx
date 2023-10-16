"use client";
import Main from "@/components/Home/Main";
import { Transition } from "@headlessui/react";
import { CheckFat } from "@phosphor-icons/react";
import { useState, Fragment, useEffect } from "react";

type IndicatorItem = {
    id: number;
    text: string;
    form?: React.ReactNode;
};

const Indicator: React.FC<{ className?: string; items: IndicatorItem[]; active: number; onChange: (v: number) => void }> = ({ className = "", items, active, onChange }) => {
    return (
        <div className={`flex rounded-full h-12 bg-light bg-opacity-30 backdrop-blur sticky bottom-6 z-[1] w-full max-w-lg mx-auto ${className}`}>
            {items.map((item) => (
                <button
                    key={item.id}
                    className={`w-full rounded-full bg-light text-on-light flex items-center justify-center transition-all ${
                        item.id === active ? "bg-opacity-100" : "bg-opacity-0 hover:bg-opacity-80"
                    }`}
                    onClick={() => onChange(item.id)}
                >
                    <span className="grid h-6 w-6 place-content-center rounded-full font-semibold">{item.text}</span>
                </button>
            ))}
        </div>
    );
};

type StepGeneralData = {
    name: string;
    nickname: string;
    dob: string;
    gender: "male" | "female";
    email: string;
    nationality: string;
    stayingCountry: string;
    joinableD1m: boolean;
    joinableD1a: boolean;
    joinableD2m: boolean;
    joinableD2a: boolean;
};
const StepGeneral: React.FC<{
    data: StepGeneralData;
    validate?: boolean;
    onChange: (d: StepGeneralData) => void;
    onValidate?: (v: boolean) => void;
}> = ({ data, validate, onChange, onValidate = (e: boolean) => {} }) => {
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    useEffect(() => {
        onValidate(data.name !== "" && data.dob !== "" && data.email !== "" && (data.joinableD1m || data.joinableD1a || data.joinableD2m || data.joinableD2a));
    });
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6 pt-6">
            <h3 className="text-5xl font-semibold px-2">General information</h3>
            <div className="grid gap-2 text-sm lg:gap-0 px-2">
                <p>Please provide the correct information so we can contact you properly.</p>
                <p>The information provided will be used for registration purposes and to communicate important updates regarding the tournament.</p>
                <p>Your privacy is important to us, and the information provided will be handled in accordance with our privacy policy.</p>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-2 -mx-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded-t-2xl rounded lg:rounded-tr p-4">
                    <span className="text-2xl font-medium">Full name</span>
                    <input value={data.name} onChange={(e) => handleChange("name", e.target.value)} type="text" placeholder="Your answer" className="bg-dark text-on-dark rounded-md h-12 p-4" />
                    {validate && data.name === "" && <span className="text-red-500 text-sm">This field is required</span>}
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded lg:rounded-tr-2xl p-4">
                    <div className="grid">
                        <span className="text-2xl font-medium">Nickname</span>
                        <span className="text-sm">Which everyone could conveniently call you</span>
                    </div>
                    <input
                        value={data.nickname}
                        onChange={(e) => handleChange("nickname", e.target.value)}
                        type="text"
                        placeholder="Your answer"
                        className="bg-dark text-on-dark rounded-md h-12 p-4"
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded lg:rounded-bl-2xl p-4">
                    <span className="text-2xl font-medium">Date of birth</span>
                    <input
                        value={data.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        type="text"
                        placeholder="DD.MM.YYYY"
                        className="appearance-none bg-dark text-on-dark rounded-md h-12 p-4"
                    />
                </label>
                <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded rounded-b-2xl lg:rounded-bl p-4">
                    <span className="text-2xl font-medium">Gender</span>
                    <div className="flex rounded-full overflow-hidden border h-12">
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                data.gender === "female" ? "bg-on-dark bg-opacity-30 duration-200" : "duration-100"
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
                        <div className="border-l"></div>
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                data.gender === "male" ? "bg-on-dark bg-opacity-30 duration-200" : "duration-100"
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

            <div className="grid gap-0.5 lg:grid-cols-2 -mx-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded rounded-t-2xl lg:rounded-tr lg:rounded-l-2xl p-4">
                    <span className="text-2xl font-medium">Nationality</span>
                    <input
                        value={data.nationality}
                        onChange={(e) => handleChange("nationality", e.target.value)}
                        type="text"
                        placeholder="Your answer"
                        className="bg-dark text-on-dark rounded-md h-12 p-4"
                    />
                </label>
                <label className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded rounded-b-2xl lg:rounded-bl lg:rounded-r-2xl p-4">
                    <span className="text-2xl font-medium">Which country are you staying?</span>
                    <input
                        value={data.stayingCountry}
                        onChange={(e) => handleChange("stayingCountry", e.target.value)}
                        type="text"
                        placeholder="Your answer"
                        className="bg-dark text-on-dark rounded-md h-12 p-4"
                    />
                </label>
            </div>

            <div className="grid gap-0.5 lg:grid-cols-2 -mx-2">
                <label className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded rounded-t-2xl lg:rounded-tr lg:rounded-l-2xl p-4">
                    <span className="text-2xl font-medium">Email</span>
                    <input
                        value={data.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        type="email"
                        inputMode="email"
                        placeholder="Your answer"
                        className="bg-dark text-on-dark rounded-md h-12 p-4"
                    />
                </label>
                <div className="grid grid-cols-1 content-between gap-4 bg-light bg-opacity-5 backdrop-blur-sm snap-start rounded rounded-b-2xl lg:rounded-bl lg:rounded-r-2xl p-4">
                    <div className="grid">
                        <span className="text-2xl font-medium">Which date could you join the tournament?</span>
                        <span className="text-sm">Please uncheck which one you couldn&#39;t join</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4 lg:gap-0">
                        <div className="flex rounded-full lg:rounded-r-none overflow-hidden border h-12 w-full max-w-md mx-auto">
                            <label
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out cursor-pointer select-none ${
                                    data.joinableD1m ? "bg-on-dark bg-opacity-30 duration-200" : "duration-100"
                                }`}
                            >
                                <input checked={data.joinableD1m} onChange={(e) => handleChange("joinableD1m", e.target.checked)} type="checkbox" hidden />
                                {data.joinableD1m && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <div className="inline-grid place-content-center text-center leading-tight">
                                    <span className="truncate">Day 1</span>
                                    <span className="truncate">Morning</span>
                                </div>
                            </label>
                            <div className="border-l"></div>
                            <label
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out cursor-pointer select-none ${
                                    data.joinableD1a ? "bg-on-dark bg-opacity-30 duration-200" : "duration-100"
                                }`}
                            >
                                <input checked={data.joinableD1a} onChange={(e) => handleChange("joinableD1a", e.target.checked)} type="checkbox" hidden />
                                {data.joinableD1a && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <div className="inline-grid place-content-center text-center leading-tight">
                                    <span className="truncate">Day 1</span>
                                    <span className="truncate">Afternoon</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex rounded-full lg:rounded-l-none lg:border-l-0 overflow-hidden border h-12 w-full max-w-md mx-auto">
                            <label
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out cursor-pointer select-none ${
                                    data.joinableD2m ? "bg-on-dark bg-opacity-30 duration-200" : "duration-100"
                                }`}
                            >
                                <input checked={data.joinableD2m} onChange={(e) => handleChange("joinableD2m", e.target.checked)} type="checkbox" hidden />
                                {data.joinableD2m && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <div className="inline-grid place-content-center text-center leading-tight">
                                    <span className="truncate">Day 2</span>
                                    <span className="truncate">Morning</span>
                                </div>
                            </label>
                            <div className="border-l"></div>
                            <label
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out cursor-pointer select-none ${
                                    data.joinableD2a ? "bg-on-dark bg-opacity-30 duration-200" : "duration-100"
                                }`}
                            >
                                <input checked={data.joinableD2a} onChange={(e) => handleChange("joinableD2a", e.target.checked)} type="checkbox" hidden />
                                {data.joinableD2a && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <div className="inline-grid place-content-center text-center leading-tight">
                                    <span className="truncate">Day 2</span>
                                    <span className="truncate">Afternoon</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Registration() {
    const [validate, setValidate] = useState(false);
    const [valid, setValid] = useState(true);
    const [dataStepGeneral, setDataStepGeneral] = useState<StepGeneralData>({
        name: "",
        nickname: "",
        dob: "",
        gender: "female",
        email: "",
        nationality: "",
        stayingCountry: "",
        joinableD1m: true,
        joinableD1a: true,
        joinableD2m: true,
        joinableD2a: true,
    });
    const steps: IndicatorItem[] = [
        {
            id: 1,
            text: "1",
            form: <StepGeneral data={dataStepGeneral} validate={validate} onChange={(e) => setDataStepGeneral(e)} onValidate={(e) => setValid(e)} />,
        },
        { id: 2, text: "2" },
        { id: 3, text: "3" },
    ];
    const [activeStep, setActiveStep] = useState(steps[0].id);
    const [isNext, setIsNext] = useState(true);
    const [delay, setDelay] = useState(false);
    const handleNext = (id: number) => {
        setIsNext(id >= activeStep);
        setValidate(true);
        if (valid) {
            setValidate(false);
            setDelay(true);
            setTimeout(() => {
                setDelay(false);
                setActiveStep(id < 1 ? 1 : id > steps.length ? steps.length : id);
            }, 200);
        }
    };
    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <div className="overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
                <Main>
                    <div className="relative min-h-[calc(100dvh_-_6rem)] pb-12">
                        {steps.map((step) => (
                            <div key={step.id} className="">
                                <Transition
                                    as={Fragment}
                                    show={activeStep === step.id && !delay}
                                    enter="transition-all ease-in-out duration-200"
                                    leave="transition-all ease-in-out duration-100"
                                    enterFrom={isNext ? "translate-x-full opacity-0" : "-translate-x-full opacity-0"}
                                    leaveTo={isNext ? "-translate-x-full opacity-0" : "translate-x-full opacity-0"}
                                >
                                    <div className="">{step.form || step.text}</div>
                                </Transition>
                            </div>
                        ))}
                    </div>
                    <Indicator items={steps} active={activeStep} onChange={(id) => handleNext(id)} />
                </Main>
            </div>
        </section>
    );
}

"use client";
import Main from "@/components/Home/Main";
import Indicator, { IndicatorItem } from "@/components/Registration/Indicator";
import StepGeneral, { StepGeneralData } from "@/components/Registration/StepGeneral";
import StepSkillset, { StepSkillsetData } from "@/components/Registration/StepSkillset";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Transition } from "@headlessui/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Fragment, useState } from "react";

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
    });
    const [dataStepSkillset, setDataStepSkillset] = useState<StepSkillsetData>({
        years: "",
        throwing: "",
        catching: "",
        cutting: "",
        defense: "",
        fitness: "",
        playExp: "",
        beACaptain: "",
    });
    const steps: IndicatorItem[] = [
        {
            id: 1,
            text: "1",
            form: <StepGeneral data={dataStepGeneral} validate={validate} onChange={(e) => setDataStepGeneral(e)} onValidate={(e) => setValid(e)} />,
        },
        { id: 2, text: "2", form: <StepSkillset data={dataStepSkillset} validate={validate} onChange={(e) => setDataStepSkillset(e)} onValidate={(e) => setValid(e)} /> },
        { id: 3, text: "3" },
    ];
    const [activeStep, setActiveStep] = useState(steps[0].id);
    const [isNext, setIsNext] = useState(true);
    const [isShaking, setIsShaking] = useState(false);
    const [delay, setDelay] = useState(false);
    const handleNext = (id: number) => {
        setIsNext(id >= activeStep);
        setValidate(true);
        if (valid || id < activeStep) {
            setValidate(false);
            if (id >= 1 && id <= steps.length) {
                setDelay(true);
                setTimeout(() => {
                    setDelay(false);
                    setActiveStep(id < 1 ? 1 : id > steps.length ? steps.length : id);
                }, 200);
            }
        }
        if (!valid || id < 1 || id > steps.length) {
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
            }, 400);
        }
    };
    const [scroll, setScroll] = useState<ScrollTarget>({ top: 0, bottom: 0, height: 0, isDown: true, isEnd: false });
    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <ScrollArea className="overscroll-contain scroll-smooth" onScroll={(v) => setScroll(v)}>
                <Main>
                    <Indicator items={steps} active={activeStep} />

                    <div className="relative min-h-[calc(100dvh_-_6rem)] w-full max-w-screen-lg mx-auto pb-6">
                        {steps.map((step) => (
                            <div key={step.id} className={isShaking ? "animate-shake-horizontal" : ""}>
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

                    <div
                        className={`flex justify-center transition-all h-12 sticky bottom-6 ${
                            !scroll.isDown && scroll.top + 24 < scroll.bottom ? "translate-y-full opacity-0 delay-200" : "delay-300"
                        }`}
                    >
                        <button
                            disabled={isShaking}
                            className={`bg-light text-on-light rounded-full h-12 w-12 lg:w-36 flex items-center gap-2 justify-center disabled:bg-opacity-30 disabled:cursor-not-allowed disabled:backdrop-blur active:scale-95 absolute top-0 right-1/2 transition-all ${
                                activeStep > 1 ? "-translate-x-2 lg:-translate-x-4" : "opacity-0 scale-0 translate-x-1/2"
                            }`}
                            onClick={() => handleNext(activeStep - 1)}
                        >
                            <ArrowLeft size={18} weight="bold" />
                            <span className="hidden lg:inline leading-none font-medium">Prev</span>
                        </button>
                        <button
                            disabled={isShaking}
                            className={`bg-light text-on-light rounded-full h-12 w-12 lg:w-36 flex items-center gap-2 justify-center disabled:bg-opacity-30 disabled:cursor-not-allowed disabled:backdrop-blur active:scale-95 absolute top-0 left-1/2 transition-all ${
                                activeStep > 1 ? "translate-x-2 lg:translate-x-4" : "-translate-x-1/2"
                            }`}
                            onClick={() => handleNext(activeStep + 1)}
                        >
                            <span className="hidden lg:inline leading-none font-medium">Next</span>
                            <ArrowRight size={18} weight="bold" />
                        </button>
                    </div>
                </Main>
            </ScrollArea>
        </section>
    );
}

"use client";
import Main from "@/components/Home/Main";
import Indicator, { IndicatorItem } from "@/components/Registration/Indicator";
import StepAdditional, { StepAdditionalData } from "@/components/Registration/StepAdditional";
import StepFinish from "@/components/Registration/StepFinish";
import StepGeneral, { StepGeneralData } from "@/components/Registration/StepGeneral";
import StepSkillset, { StepSkillsetData } from "@/components/Registration/StepSkillset";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/i18n/client";
import { Transition } from "@headlessui/react";
// import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Fragment, useState } from "react";

export default function Registration() {
    const { t, i18n } = useAppTranslation();
    const [validate, setValidate] = useState(false);
    const [valid, setValid] = useState(true);
    const [dataStepGeneral, setDataStepGeneral] = useState<StepGeneralData>({
        name: "",
        nickname: "",
        yob: "",
        gender: "female",
        email: "",
        nationality: "",
        stayingCountry: "",
        isStudent: false,
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
    const [dataStepAdditional, setDataStepAdditional] = useState<StepAdditionalData>({
        height: "",
        lunchD1: true,
        lunchD2: true,
        isVegan: false,
        allergies: "",
        busD1Depart: true,
        busD1Return: true,
        busD2Depart: true,
        busD2Return: true,
        jerseys: [{ color: "black", size: "m" }],
        disc: 1,
    });
    const steps: IndicatorItem[] = [
        {
            id: 1,
            text: "1",
            form: <StepGeneral data={dataStepGeneral} validate={validate} onChange={(e) => setDataStepGeneral(e)} onValidate={(e) => setValid(e)} />,
        },
        { id: 2, text: "2", form: <StepSkillset data={dataStepSkillset} validate={validate} onChange={(e) => setDataStepSkillset(e)} onValidate={(e) => setValid(e)} /> },
        { id: 3, text: "3", form: <StepAdditional data={dataStepAdditional} validate={validate} onChange={(e) => setDataStepAdditional(e)} onValidate={(e) => setValid(e)} /> },
        { id: 4, text: "4", form: <StepFinish /> },
    ];
    const [activeStep, setActiveStep] = useState(steps[0].id);
    const [isNext, setIsNext] = useState(true);
    const [isShaking, setIsShaking] = useState(false);
    const [delay, setDelay] = useState(false);
    const handleNext = (id: number) => {
        setIsNext(id >= activeStep);
        // setValidate(true);
        // if (valid || id < activeStep) {
        //     setValidate(false);
        //     if (id >= 1 && id <= steps.length) {
        //         setDelay(true);
        //         setTimeout(() => {
        //             setDelay(false);
        //             setActiveStep(id < 1 ? 1 : id > steps.length ? steps.length : id);
        //         }, 200);
        //     }
        // }
        // if (!valid || id < 1 || id > steps.length) {
        //     setIsShaking(true);
        //     setTimeout(() => {
        //         setIsShaking(false);
        //     }, 400);
        // }

        if (id >= 1 && id <= steps.length) {
            setDelay(true);
            setTimeout(() => {
                setDelay(false);
                setActiveStep(id < 1 ? 1 : id > steps.length ? steps.length : id);
            }, 200);
        }
    };
    const [scroll, setScroll] = useState<ScrollTarget>({ top: 0, bottom: 0, height: 0, isDown: true, isEnd: false });
    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <Button onClick={()=>i18n.changeLanguage(i18n.resolvedLanguage==="vi"?"en":"vi")}>{i18n.resolvedLanguage}</Button>
            <ScrollArea className={`scroll-smooth ${(!scroll.isDown && !scroll.isEnd) || scroll.top <= 0 ? "overscroll-none" : "overscroll-contain"}`} onScroll={(v) => setScroll(v)}>
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
                                    enterFrom={isNext ? "translate-x-1/4 opacity-0" : "-translate-x-1/4 opacity-0"}
                                    leaveTo={isNext ? "-translate-x-1/4 opacity-0" : "translate-x-1/4 opacity-0"}
                                >
                                    <div className="">{step.form || step.text}</div>
                                </Transition>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center transition-all overflow-hidden sticky bottom-0 z-20 -mb-6 pb-6">
                        <div className={`flex justify-center transition-all h-12 ${!scroll.isDown && scroll.top + 24 < scroll.bottom ? "translate-y-full opacity-0 delay-200" : "delay-300"}`}>
                            <button
                                disabled={isShaking}
                                className={`rounded-full h-12 flex items-center gap-2 justify-center disabled:bg-opacity-30 disabled:cursor-not-allowed disabled:backdrop-blur active:scale-95 absolute top-0 transition-all ${
                                    activeStep === steps.length
                                        ? "left-0 right-[calc(100%_-_3rem)] w-12"
                                        : `bg-foreground text-background w-12 lg:w-32 ${
                                              activeStep > 1
                                                  ? "right-[calc(50%_+_0.5rem)] left-[calc(50%_-_3.5rem)] lg:left-[calc(50%_-_8.5rem)]"
                                                  : "right-[calc(50%_-_1.5rem)] left-[calc(50%_-_1.5rem)] lg:right-[calc(50%_-_4rem)] lg:left-[calc(50%_-_4rem)]"
                                          }`
                                }`}
                                onClick={() => handleNext(activeStep - 1)}
                            >
                                <ArrowLeft size={18} strokeWidth="2.5" />
                                {activeStep < steps.length && <span className="hidden lg:inline leading-none font-medium">{t("Prev")}</span>}
                            </button>
                            <button
                                disabled={isShaking}
                                className={`bg-foreground text-background rounded-full h-12 flex items-center gap-2 justify-center disabled:bg-opacity-30 disabled:cursor-not-allowed disabled:backdrop-blur active:scale-95 absolute top-0 transition-all ${
                                    activeStep === steps.length
                                        ? "right-0 left-16 w-[calc(100%_-_4rem)]"
                                        : `w-12 lg:w-32 ${
                                              activeStep > 1
                                                  ? "left-[calc(50%_+_0.5rem)] right-[calc(50%_-_3.5rem)] lg:right-[calc(50%_-_8.5rem)]"
                                                  : "left-[calc(50%_-_1.5rem)] right-[calc(50%_-_1.5rem)] lg:left-[calc(50%_-_4rem)] lg:right-[calc(50%_-_4rem)]"
                                          }`
                                }`}
                                onClick={() => handleNext(activeStep + 1)}
                            >
                                <Transition
                                    as="span"
                                    show={activeStep === steps.length}
                                    enter="transiton-all ease-in-out"
                                    entered="font-medium truncate min-w-max"
                                    enterFrom="opacity-0 w-0"
                                    leaveTo="opacity-0 w-0"
                                >
                                    Send the registration
                                </Transition>
                                {activeStep < steps.length && <span className="hidden lg:inline leading-none font-medium">Next</span>}
                                <ArrowRight size={18} strokeWidth="2.5" className={`inline-block transition-all ${activeStep < steps.length ? "" : "-rotate-45"}`} />
                            </button>
                        </div>
                    </div>
                </Main>
            </ScrollArea>
        </section>
    );
}

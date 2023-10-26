"use client";

import { fetchTournamentInfo, registerTournament } from "@/api/register";
import Main from "@/components/Home/Main";
import Indicator, { IndicatorItem } from "@/components/Registration/Indicator";
import StepAdditional, { StepAdditionalData } from "@/components/Registration/StepAdditional";
import StepFinish from "@/components/Registration/StepFinish";
import StepGeneral, { StepGeneralData } from "@/components/Registration/StepGeneral";
import StepSkillset, { StepSkillsetData } from "@/components/Registration/StepSkillset";
import Loading from "@/components/UIs/Loading";
import ScrollArea, { ScrollTarget } from "@/components/UIs/ScrollArea";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/i18n/client";
import { Transition } from "@headlessui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function Registration() {
    const { t, i18n } = useAppTranslation();

    const [loading, setLoading] = useState(true);
    const [validate, setValidate] = useState(false);
    const [valid, setValid] = useState(true);
    const [scroll, setScroll] = useState<ScrollTarget>({ top: 0, bottom: 0, height: 0, isDown: true, isEnd: false });
    const [dataStepGeneral, setDataStepGeneral] = useState<StepGeneralData>({
        name: "",
        nickname: "",
        yob: "",
        gender: "female",
        email: "",
        stayingCountry: "",
        isStudent: false,
    });
    const [dataStepSkillset, setDataStepSkillset] = useState<StepSkillsetData>({
        years: 0,
        throwing: 0,
        catching: 0,
        cutting: 0,
        defense: 0,
        fitness: 0,
        playExp: 0,
        beACaptain: 0,
    });
    const [dataStepAdditional, setDataStepAdditional] = useState<StepAdditionalData>({
        height: "",
        lunch: true,
        isVegan: false,
        allergies: "",
        bus: true,
        jerseys: [
            { id: "j-1", color: "black", size: "m" },
            { id: "j-2", color: "white", size: "m" },
        ],
        shorts: [],
        disc: 1,
    });
    const steps: IndicatorItem[] = [
        {
            id: 1,
            text: "1",
            form: <StepGeneral data={dataStepGeneral} validate={validate} onChange={(e) => setDataStepGeneral(e)} onValidate={(e) => setValid(e)} />,
        },
        { id: 2, text: "2", form: <StepSkillset data={dataStepSkillset} validate={validate} onChange={(e) => setDataStepSkillset(e)} onValidate={(e) => setValid(e)} /> },
        {
            id: 3,
            text: "3",
            form: (
                <StepAdditional
                    data={dataStepAdditional}
                    validate={validate}
                    scroll={scroll}
                    isStudent={dataStepGeneral.isStudent}
                    country={dataStepGeneral.stayingCountry}
                    onChange={(e) => setDataStepAdditional(e)}
                    onValidate={(e) => setValid(e)}
                />
            ),
        },
        { id: 4, text: "4", form: <StepFinish dataGeneral={dataStepGeneral} dataSkillset={dataStepSkillset} dataAdditional={dataStepAdditional} /> },
    ];
    const [activeStep, setActiveStep] = useState(steps[0].id);
    const [isNext, setIsNext] = useState(true);
    const [isShaking, setIsShaking] = useState(false);
    const [delay, setDelay] = useState(false);
    const [delayStart, setDelayStart] = useState(false);
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

        // if (id >= 1 && id <= steps.length) {
        //     setDelay(true);
        //     setTimeout(() => {
        //         setDelay(false);
        //         setActiveStep(id < 1 ? 1 : id > steps.length ? steps.length : id);
        //     }, 200);
        // }
    };
    const [langSelected, setLangSelected] = useState(false);
    const handleSelectLang = (lang: string) => {
        i18n.changeLanguage(lang);
        setLangSelected(true);
        setDelayStart(true);
        document.querySelector("body")?.classList.add("dark");
        setTimeout(() => {
            setDelayStart(false);
        }, 10);
    };

    // Call api register Tournament
    const submitData = async () => {
        try {
            // API-EVENT: Start call API, need loading behavior
            const response = await registerTournament({
                ...dataStepGeneral,
                options: JSON.stringify({
                    skills: dataStepSkillset,
                    addition: dataStepAdditional,
                }),
            });

            // API-EVENT: Call API Suucess, Redirect to page success
            const { player_code: playerCode } = response.data.data;
            // This is player code of user to tracking info
            console.log(playerCode);
        } catch (e) {
            // API-EVENT: Have error
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    return (
        <section className={`grid grid-cols-1 grid-rows-1 gap-12 h-[100dvh] w-[100dvw] overflow-hidden`}>
            <Transition
                as={Fragment}
                show={!delayStart && !langSelected}
                enter="transition-all ease-in-out duration-500"
                leave="transition-all ease-in-out duration-500"
                enterFrom={"translate-y-full opacity-0"}
                leaveTo={"-translate-y-full"}
            >
                <div className={`fixed inset-0 light bg-background grid-bg grid lg:grid-cols-2 lg:gap-16 min-w-[15rem] place-content-center`}>
                    <Transition
                        as={Fragment}
                        show={!loading}
                        enter="transition-all ease-in-out duration-200"
                        leave="transition-all ease-in-out duration-100"
                        enterFrom={"translate-y-1/4 lg:translate-y-0 lg:translate-x-1/4 opacity-0"}
                        leaveTo={"-translate-y-1/4 lg:translate-y-0 lg:-translate-x-1/4 opacity-0"}
                    >
                        <div className="flex justify-center lg:justify-end">
                            <img src="./heading.svg" className="w-[calc(100dvw)] max-h-[50dvh] max-w-2xl" />
                        </div>
                    </Transition>
                    <Transition
                        as={Fragment}
                        show={!loading}
                        enter="transition-all ease-in-out duration-200"
                        leave="transition-all ease-in-out duration-100"
                        enterFrom={"-translate-y-1/4 lg:translate-y-0 lg:-translate-x-1/4 opacity-0"}
                        leaveTo={"translate-y-1/4 lg:translate-y-0 lg:translate-x-1/4 opacity-0"}
                    >
                        <div className="grid w-full max-w-[15rem] gap-4 m-auto lg:mx-0">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio natus libero doloremque ex odio aliquid sint asperiores dolor ad dignissimos.</p>
                            <Button onClick={() => handleSelectLang("en")} className={`flex justify-between rounded-full px-6 gap-2`}>
                                {"English"}
                                <ArrowRight />
                            </Button>
                            <Button onClick={() => handleSelectLang("vi")} className="flex justify-between rounded-full px-6 gap-2">
                                {"Tiếng Việt"}
                                <ArrowRight />
                            </Button>
                        </div>
                    </Transition>
                </div>
            </Transition>

            <ScrollArea
                className={`scroll-smooth transition-all ease-in-out duration-500 ${langSelected && !delayStart ? "" : "pointer-events-none translate-y-full invisible"} ${
                    (!scroll.isDown && !scroll.isEnd) || scroll.top <= 0 ? "overscroll-none" : "overscroll-contain"
                }`}
                onScroll={(v) => setScroll(v)}
            >
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
                                onClick={() => (activeStep === steps.length ? submitData() : handleNext(activeStep + 1))}
                            >
                                <Transition
                                    as="span"
                                    show={activeStep === steps.length}
                                    enter="transiton-all ease-in-out"
                                    entered="font-medium truncate min-w-max"
                                    enterFrom="opacity-0 w-0"
                                    leaveTo="opacity-0 w-0"
                                >
                                    {t("Send the registration")}
                                </Transition>
                                {activeStep < steps.length && <span className="hidden lg:inline leading-none font-medium">{t("Next")}</span>}
                                <ArrowRight size={18} strokeWidth="2.5" className={`inline-block transition-all ${activeStep < steps.length ? "" : "-rotate-45"}`} />
                            </button>
                        </div>
                    </div>
                </Main>
            </ScrollArea>
        </section>
    );
}

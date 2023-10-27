import { CheckFat, Image } from "@phosphor-icons/react";
import { Banana, Beer, Citrus, Croissant, Cross, CupSoda, GlassWater, Minus, Plus, Sandwich, Shirt, Stethoscope, X, Zap } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Transition } from "@headlessui/react";
import { useAppTranslation } from "@/i18n/client";
import { ScrollTarget } from "../UIs/ScrollArea";
import { Button } from "../ui/button";

export enum clothColor {
    BLACK = "black",
    WHITE = "white",
}
export enum clothSize {
    S = "s",
    M = "m",
    L = "l",
    XL = "xl",
    XL2 = "2xl",
    XL3 = "3xl",
    XL4 = "4xl",
    XL5 = "5xl",
}
export type Cloth = { id: string; color: clothColor; size: clothSize };
export type StepAdditionalData = {
    height: string;
    lunch: boolean;
    isVegan: boolean;
    allergies: string;
    bus: boolean;
    jerseys: Cloth[];
    shorts: Cloth[];
    disc: number;
};
type Props = {
    data: StepAdditionalData;
    validate?: boolean;
    scroll?: ScrollTarget;
    isStudent?: boolean;
    country?: string;
    onChange: (d: StepAdditionalData) => void;
    onValidate?: (v: boolean) => void;
};
export default function StepAdditional({ data, validate, scroll, isStudent, country, onChange, onValidate = (e: boolean) => {} }: Props) {
    const { t, i18n } = useAppTranslation();
    const [total, setTotal] = useState(0);
    const [useBlackJersey, setUseBlackJersey] = useState(true);
    const [useWhiteJersey, setUseWhiteJersey] = useState(true);
    const [useBlackShort, setUseBlackShort] = useState(true);
    const [useWhiteShort, setUseWhiteShort] = useState(true);
    const sizeChart: { size: clothSize; x: number; y: number }[] = [
        { size: clothSize.S, x: 43, y: 65 },
        { size: clothSize.M, x: 45, y: 67 },
        { size: clothSize.L, x: 47, y: 69 },
        { size: clothSize.XL, x: 49, y: 71 },
        { size: clothSize.XL2, x: 51, y: 73 },
        { size: clothSize.XL3, x: 53, y: 75 },
        { size: clothSize.XL4, x: 55, y: 77 },
        { size: clothSize.XL5, x: 57, y: 79 },
        // { size: "6xl", x: 59, y: 81 },
    ];
    const [blackJerseys, setBlackJerseys] = useState<Cloth[]>(data.jerseys.filter((j) => j.color === clothColor.BLACK));
    const [whiteJerseys, setWhiteJerseys] = useState<Cloth[]>(data.jerseys.filter((j) => j.color === clothColor.WHITE));
    const [blackShorts, setBlackShorts] = useState<Cloth[]>(data.shorts.filter((s) => s.color === clothColor.BLACK));
    const [whiteShorts, setWhiteShorts] = useState<Cloth[]>(data.shorts.filter((s) => s.color === clothColor.WHITE));
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    useEffect(() => {
        setTotal((v) => {
            const fixed = 700000;
            const lunch = data.lunch ? 170000 : 0;
            const bus = data.bus ? 200000 : 0;
            const jersey = data.jerseys.length * 170000;
            const short = data.shorts.length * 200000;
            const disc = data.disc * 200000;
            return fixed + lunch + bus + jersey + short + disc;
        });
    }, [data]);
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3
                className={`font-semibold sticky top-0 -mx-6 px-6 flex justify-between gap-2 transition-all ${
                    scroll && scroll.top > 0
                        ? "text-xl bg-foreground bg-opacity-80 backdrop-blur text-background rounded-b-2xl z-[11] shadow-md shadow-background duration-200 py-4"
                        : "text-5xl bg-background grid-bg pt-12 pb-4 z-[1] duration-100"
                }`}
            >
                <span>{scroll && scroll.top > 0 ? t("Total") : t("Tournament fee")}</span>
                {scroll &&
                    scroll.top > 0 &&
                    (country === "Vietnam" ? (
                        <span className="font-mono">{Intl.NumberFormat("en-US").format(total).replaceAll(",", "'")} VND</span>
                    ) : country === "Philippines" ? (
                        <span className="font-mono text-right">
                            {Intl.NumberFormat("en-US")
                                .format(Math.ceil(total / 425))
                                .replaceAll(",", "'")}{" "}
                            PHP
                        </span>
                    ) : country === "Singapore" ? (
                        <span className="font-mono text-right">
                            {Intl.NumberFormat("en-US")
                                .format(Math.ceil(total / 17500))
                                .replaceAll(",", "'")}{" "}
                            SGD
                        </span>
                    ) : country === "Malaysia" ? (
                        <span className="font-mono text-right">
                            {Intl.NumberFormat("en-US")
                                .format(Math.ceil(total / 5145))
                                .replaceAll(",", "'")}{" "}
                            MYR
                        </span>
                    ) : (
                        <span className="font-mono text-right">
                            {Intl.NumberFormat("en-US")
                                .format(Math.ceil(total / 24500))
                                .replaceAll(",", "'")}{" "}
                            USD
                        </span>
                    ))}
            </h3>
            <div className="grid gap-2 text-sm lg:text-base lg:gap-0 -mt-4">
                <p>{t("Player fee included:")} </p>
                <div className="flex flex-wrap justify-center gap-4 py-4 z-0">
                    <div className="flex flex-grow gap-4">
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-3xl border grid gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">{t("Field")}</div>
                            <div className="flex items-center justify-center">
                                <div className="border-2 h-12 lg:h-16 w-36 lg:w-48 grid grid-cols-[minmax(0,25fr)_minmax(0,70fr)_minmax(0,25fr)] divide-x-2 border-foreground divide-foreground rounded">
                                    <div></div>
                                    <div className="px-6 lg:px-8 flex justify-between items-center">
                                        <span>
                                            <X size={12} strokeWidth={3} className="-translate-x-1/2" />
                                        </span>
                                        <span>
                                            <X size={12} strokeWidth={3} className="translate-x-1/2" />
                                        </span>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-3xl border grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">{t("Medic & First Aid")}</div>
                            <div className="grid place-content-center">
                                <div className="inline-grid grid-cols-2 place-content-center gap-1">
                                    <span>
                                        <Cross size={32} strokeWidth={1.5} />
                                    </span>
                                    <span>
                                        <Stethoscope size={32} strokeWidth={1.5} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-grow gap-4">
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-3xl border grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">{t("Beverage & electrolytes")}</div>
                            <div className="grid place-content-center">
                                <div className="inline-grid grid-cols-2 grid-rows-2 place-content-center gap-1">
                                    <span>
                                        <Beer size={32} strokeWidth={1.5} />
                                    </span>
                                    <span>
                                        <CupSoda size={32} strokeWidth={1.5} />
                                    </span>
                                    <span>
                                        <GlassWater size={32} strokeWidth={1.5} />
                                    </span>
                                    <span>
                                        <Zap size={32} strokeWidth={1.5} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-3xl border grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">{t("Fruits & Snack")}</div>
                            <div className="grid place-content-center">
                                <div className="inline-grid grid-cols-2 grid-rows-2 place-content-center gap-1">
                                    <span>
                                        <Banana size={32} strokeWidth={1.5} />
                                    </span>
                                    <span>
                                        <Citrus size={32} strokeWidth={1.5} />
                                    </span>
                                    <span>
                                        <Sandwich size={32} strokeWidth={1.5} />
                                    </span>
                                    <span>
                                        <Croissant size={32} strokeWidth={1.5} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p>{t("And these items below are optional. Uncheck which one you prefer to prepare yourself. The fee might be reduced.")}</p>

                <div className="grid text-base gap-4 py-4 z-10">
                    <div className="grid gap-0.5">
                        <div className={`bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6 ${data.lunch ? "rounded rounded-t-3xl" : "rounded-3xl"}`}>
                            <div className="text-2xl font-medium">{t("Lunch")}</div>
                            <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${data.lunch ? "bg-primary bg-opacity-30 duration-200" : "duration-100"}`}
                                    onClick={() => handleChange("lunch", true)}
                                >
                                    {data.lunch && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span>{t("Yes")}</span>
                                </button>
                                <div className="border-l border-foreground border-opacity-60"></div>
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        !data.lunch ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => handleChange("lunch", false)}
                                >
                                    {!data.lunch && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span>{t("No")}</span>
                                </button>
                            </div>
                        </div>
                        <Transition
                            show={data.lunch}
                            as={Fragment}
                            enter="transition-all duration-200 ease-in"
                            leave="transition-all duration-100 ease-out"
                            enterFrom="-translate-y-4 opacity-0"
                            leaveTo="-translate-y-4 opacity-0"
                        >
                            <div className={`bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6 rounded`}>
                                <span className="text-2xl font-medium">{t("Are you vegan?")}</span>
                                <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                                    <button
                                        className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                            data.isVegan ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                        }`}
                                        onClick={() => handleChange("isVegan", true)}
                                    >
                                        {data.isVegan && (
                                            <span>
                                                <CheckFat size={18} weight="fill" />
                                            </span>
                                        )}
                                        <span>{t("Yes")}</span>
                                    </button>
                                    <div className="border-l border-foreground border-opacity-60"></div>
                                    <button
                                        className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                            !data.isVegan ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                        }`}
                                        onClick={() => handleChange("isVegan", false)}
                                    >
                                        {!data.isVegan && (
                                            <span>
                                                <CheckFat size={18} weight="fill" />
                                            </span>
                                        )}
                                        <span>{t("No")}</span>
                                    </button>
                                </div>
                            </div>
                        </Transition>
                        <Transition
                            show={data.lunch}
                            as={Fragment}
                            enter="transition-all duration-200 ease-in"
                            leave="transition-all duration-100 ease-out"
                            enterFrom="-translate-y-4 opacity-0"
                            leaveTo="-translate-y-4 opacity-0"
                        >
                            <div className={`bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6 rounded rounded-b-3xl`}>
                                <span className="text-2xl font-medium">{t("Allergies?")}</span>
                                <Input value={data.allergies} onChange={(e) => handleChange("allergies", e.target.value)} clearable placeholder={t("Your answer") || ""} />
                            </div>
                        </Transition>
                    </div>

                    <div className="rounded-3xl bg-foreground bg-opacity-5 backdrop-blur-xl grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                        <div className="text-2xl font-medium">{t("Shuttle Bus")}</div>
                        <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                            <button
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${data.bus ? "bg-primary bg-opacity-30 duration-200" : "duration-100"}`}
                                onClick={() => handleChange("bus", true)}
                            >
                                {data.bus && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <span>{t("Yes")}</span>
                            </button>
                            <div className="border-l border-foreground border-opacity-60"></div>
                            <button
                                className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${!data.bus ? "bg-primary bg-opacity-30 duration-200" : "duration-100"}`}
                                onClick={() => handleChange("bus", false)}
                            >
                                {!data.bus && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <span>{t("No")}</span>
                            </button>
                        </div>

                        <div className="px-4 lg:px-6 -mx-4 lg:-mx-6 pt-4 border-t">Bus stop location...</div>
                    </div>

                    <div className="grid gap-0.5">
                        <div className="rounded rounded-t-3xl bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6">
                            <div className="text-2xl font-medium">{t("Jersey & Short")}</div>
                            <div className="grid text-sm lg:text-base gap-2">
                                <p>{t("This year, the match is between Black & White.")}</p>
                                <p>{t("Each player NEED TO PREPARE A BLACK JERSEY AND A WHITE JERSEY for changing (or flipping).")}</p>
                                <p>{t("You can prepare yourself or order tournament jersey designs.")}</p>
                            </div>
                        </div>

                        <div className="rounded bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6">
                            <div className="font-medium uppercase">{t("Black jersey")}</div>
                            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        useBlackJersey ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseBlackJersey(true);
                                        handleChange("jerseys", [...blackJerseys, ...data.jerseys]);
                                    }}
                                >
                                    {useBlackJersey && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span>{t("Order")}</span>
                                </button>
                                <div className="border-l border-foreground border-opacity-60"></div>
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        !useBlackJersey ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseBlackJersey(false);
                                        handleChange("jerseys", [...data.jerseys.filter((e) => e.color !== clothColor.BLACK)]);
                                    }}
                                >
                                    {!useBlackJersey && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span className="truncate">{t("Already have")}</span>
                                </button>
                            </div>
                            <Transition
                                show={useBlackJersey}
                                as={Fragment}
                                enter="transition-all duration-200 ease-in"
                                leave="transition-all duration-100 ease-out"
                                enterFrom="-translate-y-4 opacity-0"
                                leaveTo="-translate-y-4 opacity-0"
                            >
                                <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
                                    <div className="flex items-center bg-secondary rounded-2xl overflow-x-scroll overflow-y-hidden snap-x snap-mandatory">
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                    </div>

                                    <div className="grid">
                                        <div className="grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] items-end">
                                            <div className="grid grid-cols-3 gap-2 text-center leading-none px-4">
                                                <span></span>
                                                <span className="text-xs">X cm</span>
                                                <span className="text-xs">Y cm</span>
                                            </div>
                                            <span></span>
                                            <span className="text-xs text-center">QTY</span>
                                        </div>
                                        <div className="grid rounded-2xl border border-primary border-opacity-60 divide-y divide-primary divide-opacity-60 overflow-hidden">
                                            {sizeChart.map((j) => (
                                                <div key={j.size} className={`grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] h-12 divide-x divide-primary divide-opacity-60`}>
                                                    <div
                                                        className={`grid grid-cols-3 gap-2 px-4 items-center text-center ${
                                                            data.jerseys.filter((e) => e.color === clothColor.BLACK && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span className="uppercase text-left">{j.size}</span>
                                                        <span>{j.x}</span>
                                                        <span>{j.y}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val = [
                                                                ...data.jerseys.filter((e) => e.id !== (data.jerseys.find((s) => s.color === clothColor.BLACK && s.size === j.size)?.id || "")),
                                                            ];
                                                            handleChange("jerseys", [...val]);
                                                            setBlackJerseys([...val.filter((v) => v.color === clothColor.BLACK)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Minus size={18} />
                                                        </span>
                                                    </button>
                                                    <div
                                                        className={`grid place-content-center ${
                                                            data.jerseys.filter((e) => e.color === clothColor.BLACK && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span>{data.jerseys.filter((e) => e.color === clothColor.BLACK && e.size === j.size).length}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val: Cloth[] = [{ id: `j-${Math.round(Math.random() * 100)}`, color: clothColor.BLACK, size: j.size }, ...data.jerseys];
                                                            handleChange("jerseys", [...val]);
                                                            setBlackJerseys([...val.filter((v) => v.color === clothColor.BLACK)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Plus size={18} />
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <div className="rounded bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6">
                            <div className="font-medium uppercase">{t("White jersey")}</div>
                            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        useWhiteJersey ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseWhiteJersey(true);
                                        handleChange("jerseys", [...whiteJerseys, ...data.jerseys]);
                                    }}
                                >
                                    {useWhiteJersey && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span>{t("Order")}</span>
                                </button>
                                <div className="border-l border-foreground border-opacity-60"></div>
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        !useWhiteJersey ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseWhiteJersey(false);
                                        handleChange("jerseys", [...data.jerseys.filter((e) => e.color !== clothColor.WHITE)]);
                                    }}
                                >
                                    {!useWhiteJersey && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span className="truncate">{t("Already have")}</span>
                                </button>
                            </div>
                            <Transition
                                show={useWhiteJersey}
                                as={Fragment}
                                enter="transition-all duration-200 ease-in"
                                leave="transition-all duration-100 ease-out"
                                enterFrom="-translate-y-4 opacity-0"
                                leaveTo="-translate-y-4 opacity-0"
                            >
                                <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
                                    <div className="flex items-center bg-secondary rounded-2xl overflow-x-scroll overflow-y-hidden snap-x snap-mandatory">
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                    </div>

                                    <div className="grid">
                                        <div className="grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] items-end">
                                            <div className="grid grid-cols-3 gap-2 text-center leading-none px-4">
                                                <span></span>
                                                <span className="text-xs">X cm</span>
                                                <span className="text-xs">Y cm</span>
                                            </div>
                                            <span></span>
                                            <span className="text-xs text-center">QTY</span>
                                        </div>
                                        <div className="grid rounded-2xl border border-primary border-opacity-60 divide-y divide-primary divide-opacity-60 overflow-hidden">
                                            {sizeChart.map((j) => (
                                                <div key={j.size} className={`grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] h-12 divide-x divide-primary divide-opacity-60`}>
                                                    <div
                                                        className={`grid grid-cols-3 gap-2 px-4 items-center text-center ${
                                                            data.jerseys.filter((e) => e.color === clothColor.WHITE && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span className="uppercase text-left">{j.size}</span>
                                                        <span>{j.x}</span>
                                                        <span>{j.y}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val = [
                                                                ...data.jerseys.filter((e) => e.id !== (data.jerseys.find((s) => s.color === clothColor.WHITE && s.size === j.size)?.id || "")),
                                                            ];
                                                            handleChange("jerseys", [...val]);
                                                            setWhiteJerseys([...val.filter((v) => v.color === clothColor.WHITE)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Minus size={18} />
                                                        </span>
                                                    </button>
                                                    <div
                                                        className={`grid place-content-center ${
                                                            data.jerseys.filter((e) => e.color === clothColor.WHITE && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span>{data.jerseys.filter((e) => e.color === clothColor.WHITE && e.size === j.size).length}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val = [{ id: `j-${Math.round(Math.random() * 100)}`, color: clothColor.WHITE, size: j.size }, ...data.jerseys];
                                                            handleChange("jerseys", [...val]);
                                                            setWhiteJerseys([...val.filter((v) => v.color === clothColor.WHITE)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Plus size={18} />
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <div className="rounded bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6">
                            <div className="font-medium uppercase">{t("Black short")}</div>
                            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        useBlackShort ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseBlackShort(true);
                                        handleChange("shorts", [...blackShorts, ...data.shorts]);
                                    }}
                                >
                                    {useBlackShort && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span>{t("Order")}</span>
                                </button>
                                <div className="border-l border-foreground border-opacity-60"></div>
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        !useBlackShort ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseBlackShort(false);
                                        handleChange("shorts", [...data.shorts.filter((e) => e.color !== clothColor.BLACK)]);
                                    }}
                                >
                                    {!useBlackShort && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span className="truncate">{t("Already have")}</span>
                                </button>
                            </div>
                            <Transition
                                show={useBlackShort}
                                as={Fragment}
                                enter="transition-all duration-200 ease-in"
                                leave="transition-all duration-100 ease-out"
                                enterFrom="-translate-y-4 opacity-0"
                                leaveTo="-translate-y-4 opacity-0"
                            >
                                <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
                                    <div className="flex items-center bg-secondary rounded-2xl overflow-x-scroll overflow-y-hidden snap-x snap-mandatory">
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                    </div>

                                    <div className="grid">
                                        <div className="grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] items-end">
                                            <div className="grid grid-cols-3 gap-2 text-center leading-none px-4">
                                                <span></span>
                                                <span className="text-xs">X cm</span>
                                                <span className="text-xs">Y cm</span>
                                            </div>
                                            <span></span>
                                            <span className="text-xs text-center">QTY</span>
                                        </div>
                                        <div className="grid rounded-2xl border border-primary border-opacity-60 divide-y divide-primary divide-opacity-60 overflow-hidden">
                                            {sizeChart.map((j) => (
                                                <div key={j.size} className={`grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] h-12 divide-x divide-primary divide-opacity-60`}>
                                                    <div
                                                        className={`grid grid-cols-3 gap-2 px-4 items-center text-center ${
                                                            data.shorts.filter((e) => e.color === clothColor.BLACK && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span className="uppercase text-left">{j.size}</span>
                                                        <span>{j.x}</span>
                                                        <span>{j.y}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val = [...data.shorts.filter((e) => e.id !== (data.shorts.find((s) => s.color === clothColor.BLACK && s.size === j.size)?.id || ""))];
                                                            handleChange("shorts", [...val]);
                                                            setBlackShorts([...val.filter((s) => s.color === clothColor.BLACK)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Minus size={18} />
                                                        </span>
                                                    </button>
                                                    <div
                                                        className={`grid place-content-center ${
                                                            data.shorts.filter((e) => e.color === clothColor.BLACK && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span>{data.shorts.filter((e) => e.color === clothColor.BLACK && e.size === j.size).length}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val = [{ id: `j-${Math.round(Math.random() * 100)}`, color: clothColor.BLACK, size: j.size }, ...data.shorts];
                                                            handleChange("shorts", [...val]);
                                                            setBlackShorts([...val.filter((s) => s.color === clothColor.BLACK)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Plus size={18} />
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <div className="rounded rounded-b-3xl bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6">
                            <div className="font-medium uppercase">{t("White short")}</div>
                            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] rounded-full overflow-hidden border border-foreground border-opacity-60 h-12 w-full max-w-lg mx-auto">
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        useWhiteShort ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseWhiteShort(true);
                                        handleChange("shorts", [...whiteShorts, ...data.shorts]);
                                    }}
                                >
                                    {useWhiteShort && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span>{t("Order")}</span>
                                </button>
                                <div className="border-l border-foreground border-opacity-60"></div>
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                        !useWhiteShort ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                    }`}
                                    onClick={() => {
                                        setUseWhiteShort(false);
                                        handleChange("shorts", [...data.shorts.filter((e) => e.color !== clothColor.WHITE)]);
                                    }}
                                >
                                    {!useWhiteShort && (
                                        <span>
                                            <CheckFat size={18} weight="fill" />
                                        </span>
                                    )}
                                    <span className="truncate">{t("Already have")}</span>
                                </button>
                            </div>
                            <Transition
                                show={useWhiteShort}
                                as={Fragment}
                                enter="transition-all duration-200 ease-in"
                                leave="transition-all duration-100 ease-out"
                                enterFrom="-translate-y-4 opacity-0"
                                leaveTo="-translate-y-4 opacity-0"
                            >
                                <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
                                    <div className="flex items-center bg-secondary rounded-2xl overflow-x-scroll overflow-y-hidden snap-x snap-mandatory">
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                        <div className="snap-center">
                                            <Image size="200" weight="fill" className="opacity-10" />
                                        </div>
                                    </div>

                                    <div className="grid">
                                        <div className="grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] items-end">
                                            <div className="grid grid-cols-3 gap-2 text-center leading-none px-4">
                                                <span></span>
                                                <span className="text-xs">X cm</span>
                                                <span className="text-xs">Y cm</span>
                                            </div>
                                            <span></span>
                                            <span className="text-xs text-center">QTY</span>
                                        </div>
                                        <div className="grid rounded-2xl border border-primary border-opacity-60 divide-y divide-primary divide-opacity-60 overflow-hidden">
                                            {sizeChart.map((j) => (
                                                <div key={j.size} className={`grid grid-cols-[minmax(0,1fr)_3rem_3rem_3rem] h-12 divide-x divide-primary divide-opacity-60`}>
                                                    <div
                                                        className={`grid grid-cols-3 gap-2 px-4 items-center text-center ${
                                                            data.shorts.filter((e) => e.color === clothColor.WHITE && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span className="uppercase text-left">{j.size}</span>
                                                        <span>{j.x}</span>
                                                        <span>{j.y}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val = [...data.shorts.filter((e) => e.id !== (data.shorts.find((s) => s.color === clothColor.WHITE && s.size === j.size)?.id || ""))];
                                                            handleChange("shorts", [...val]);
                                                            setWhiteShorts([...val.filter((v) => v.color === clothColor.WHITE)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Minus size={18} />
                                                        </span>
                                                    </button>
                                                    <div
                                                        className={`grid place-content-center ${
                                                            data.shorts.filter((e) => e.color === clothColor.WHITE && e.size === j.size).length > 0 ? "bg-primary bg-opacity-30" : ""
                                                        }`}
                                                    >
                                                        <span>{data.shorts.filter((e) => e.color === clothColor.WHITE && e.size === j.size).length}</span>
                                                    </div>
                                                    <button
                                                        className="grid place-content-center"
                                                        onClick={() => {
                                                            const val = [{ id: `j-${Math.round(Math.random() * 100)}`, color: clothColor.WHITE, size: j.size }, ...data.shorts];
                                                            handleChange("shorts", [...val]);
                                                            setWhiteShorts([...val.filter((v) => v.color === clothColor.WHITE)]);
                                                        }}
                                                    >
                                                        <span>
                                                            <Plus size={18} />
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-foreground bg-opacity-5 backdrop-blur-xl grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                        <div className="text-2xl font-medium">{t("Tournament disc")}</div>
                        <div className="grid lg:gap-6 gap-4 w-full max-w-lg mx-auto">
                            <div className="grid place-content-center bg-secondary rounded-2xl">
                                <Image size="200" weight="fill" className="opacity-10" />
                            </div>

                            <div className="flex flex-wrap justify-center items-center">
                                <span className="w-full text-xs text-center">QTY</span>
                                <div className={`grid grid-cols-[3rem_3rem_3rem] h-12 border border-primary border-opacity-60 divide-x divide-primary divide-opacity-60 rounded-full overflow-hidden`}>
                                    <button className="grid place-content-center" onClick={() => handleChange("disc", data.disc > 0 ? data.disc - 1 : 0)}>
                                        <span>
                                            <Minus size={18} />
                                        </span>
                                    </button>
                                    <div className={`grid place-content-center ${data.disc > 0 ? "bg-primary bg-opacity-30" : ""}`}>
                                        <span>{data.disc}</span>
                                    </div>
                                    <button className="grid place-content-center" onClick={() => handleChange("disc", data.disc + 1)}>
                                        <span>
                                            <Plus size={18} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

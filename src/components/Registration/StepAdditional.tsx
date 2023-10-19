import { CheckFat, TShirt } from "@phosphor-icons/react";
import { ArrowBigRight, Banana, Beer, Citrus, Croissant, Cross, CupSoda, GlassWater, Sandwich, Shirt, Stethoscope, X, Zap } from "lucide-react";
import { Fragment, useEffect } from "react";
import { Input } from "../ui/input";
import { Transition } from "@headlessui/react";

export type StepAdditionalData = {
    height: string;
    lunchD1: boolean;
    lunchD2: boolean;
    isVegan: boolean;
    allergies: string;
    busD1Depart: boolean;
    busD1Return: boolean;
    busD2Depart: boolean;
    busD2Return: boolean;
    jerseys: { color: "black" | "white"; size: "s" | "m" | "l" | "xl" | "2xl" | "3xl" }[];
    disc: number;
};
type Props = {
    data: StepAdditionalData;
    validate?: boolean;
    onChange: (d: StepAdditionalData) => void;
    onValidate?: (v: boolean) => void;
};
export default function StepAdditional({ data, validate, onChange, onValidate = (e: boolean) => {} }: Props) {
    const handleChange = (prop: string, value: any) => {
        onChange({ ...data, [prop]: value });
    };
    useEffect(() => {
        onValidate(data.height !== "");
    });
    return (
        <div className="flex flex-col gap-6 snap-start -mt-6">
            <h3 className="text-5xl font-semibold sticky top-0 z-[1] pt-12 pb-4 bg-background grid-bg">Additional</h3>
            <div className="grid gap-2 text-sm lg:text-base lg:gap-0 -mt-4">
                <p>Player fee included: </p>
                <div className="flex flex-wrap justify-center gap-4 py-4 z-0">
                    <div className="flex flex-grow gap-4">
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-2xl border grid gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">Field</div>
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
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-2xl border grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">Medic & First Aid</div>
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
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-2xl border grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">Beverage & electrolytes</div>
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
                        <div className="bg-background flex-grow w-full sm:w-auto rounded-2xl border grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                            <div className="uppercase font-medium">Fruits & Snack</div>
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

                <p>And these items below are optional. Uncheck which one you prefer to prepare yourself. The fee might be reduced.</p>

                <div className="grid text-base gap-4 py-4 z-10">
                    <div className="flex-grow rounded-2xl bg-foreground bg-opacity-5 backdrop-blur-xl grid gap-4 p-4 lg:p-6">
                        <div className="text-2xl font-medium">Lunch</div>
                        <div className="grid grid-cols-2 w-full max-w-lg mx-auto gap-4">
                            <button
                                className={`flex items-center justify-center rounded-full border border-foreground border-opacity-60 gap-2 px-4 h-12 transition-all ease-in-out ${
                                    data.lunchD1 ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                }`}
                                onClick={() => handleChange("lunchD1", !data.lunchD1)}
                            >
                                {data.lunchD1 && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <span>Day 1</span>
                            </button>
                            <button
                                className={`flex items-center justify-center rounded-full border border-foreground border-opacity-60 gap-2 px-4 h-12 transition-all ease-in-out ${
                                    data.lunchD2 ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                }`}
                                onClick={() => handleChange("lunchD2", !data.lunchD2)}
                            >
                                {data.lunchD2 && (
                                    <span>
                                        <CheckFat size={18} weight="fill" />
                                    </span>
                                )}
                                <span>Day 2</span>
                            </button>
                        </div>
                        <Transition
                            show={data.lunchD1 || data.lunchD2}
                            as={Fragment}
                            enter="transition-all duration-200 ease-in"
                            leave="transition-all duration-100 ease-out"
                            enterFrom="-translate-y-4 opacity-0"
                            leaveTo="translate-y-4 opacity-0"
                        >
                            <div className="grid gap-4 pt-4 border-t -mx-4 lg:-mx-6 px-4 lg:px-6">
                                <div className="grid gap-2">
                                    <span>Are you vegan?</span>
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
                                            <span>Yes</span>
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
                                            <span>No</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <span>Allergies?</span>
                                    <Input value={data.allergies} onChange={(e) => handleChange("allergies", e.target.value)} clearable placeholder="Your answer" />
                                </div>
                            </div>
                        </Transition>
                    </div>
                    <div className="flex-grow rounded-2xl bg-foreground bg-opacity-5 backdrop-blur-xl grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                        <div className="text-2xl font-medium">Shuttle Bus</div>
                        <div className="grid lg:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <span className="text-center">Day 1</span>
                                <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-60 h-12">
                                    <button
                                        className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                            data.busD1Depart ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                        }`}
                                        onClick={() => handleChange("busD1Depart", !data.busD1Depart)}
                                    >
                                        {data.busD1Depart && (
                                            <span>
                                                <CheckFat size={18} weight="fill" />
                                            </span>
                                        )}
                                        <span className="flex items-center gap-2">Depart</span>
                                    </button>
                                    <div className="border-l border-foreground border-opacity-60"></div>
                                    <button
                                        className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                            data.busD1Return ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                        }`}
                                        onClick={() => handleChange("busD1Return", !data.busD1Return)}
                                    >
                                        {data.busD1Return && (
                                            <span>
                                                <CheckFat size={18} weight="fill" />
                                            </span>
                                        )}
                                        <span className="flex items-center gap-2">Return</span>
                                    </button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <span className="text-center">Day 2</span>
                                <div className="flex rounded-full overflow-hidden border border-foreground border-opacity-60 h-12">
                                    <button
                                        className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                            data.busD2Depart ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                        }`}
                                        onClick={() => handleChange("busD2Depart", !data.busD2Depart)}
                                    >
                                        {data.busD2Depart && (
                                            <span>
                                                <CheckFat size={18} weight="fill" />
                                            </span>
                                        )}
                                        <span className="flex items-center gap-2">Depart</span>
                                    </button>
                                    <div className="border-l border-foreground border-opacity-60"></div>
                                    <button
                                        className={`w-full flex items-center justify-center gap-2 px-4 transition-all ease-in-out ${
                                            data.busD2Return ? "bg-primary bg-opacity-30 duration-200" : "duration-100"
                                        }`}
                                        onClick={() => handleChange("busD2Return", !data.busD2Return)}
                                    >
                                        {data.busD2Return && (
                                            <span>
                                                <CheckFat size={18} weight="fill" />
                                            </span>
                                        )}
                                        <span className="flex items-center gap-2">Return</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 lg:px-6 -mx-4 lg:-mx-6 pt-4 border-t">Bus stop location...</div>
                    </div>

                    <div className="flex-grow rounded-2xl bg-foreground bg-opacity-5 backdrop-blur-xl grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 lg:p-6">
                        <div className="text-2xl font-medium">Jersey & Short</div>

                        <div className="px-4 lg:px-6 -mx-4 lg:-mx-6 py-4 border-y">
                            <div className="grid grid-cols-[auto_minmax(0,1fr)] text-sm gap-x-4 w-full max-w-lg mx-auto">
                                <div className="grid grid-row-[auto_minmax(0,1fr)]">
                                    <span className="">Size chart (in cm)</span>
                                    <div className="flex items-center justify-center pr-4 pt-4">
                                        <div className="w-42 h-42 flex items-center justify-center relative">
                                            <div className="absolute -top-2 left-2 right-2 flex items-center gap-1 leading-none text-xs">
                                                <div className="border-t border-foreground border-opacity-30 w-full"></div>
                                                <span>X</span>
                                                <div className="border-t border-foreground border-opacity-30 w-full"></div>
                                            </div>
                                            <div className="absolute -right-2 top-2 bottom-2 flex flex-col items-center gap-1 leading-none text-xs">
                                                <div className="border-l border-foreground border-opacity-30 h-full"></div>
                                                <span>Y</span>
                                                <div className="border-l border-foreground border-opacity-30 h-full"></div>
                                            </div>
                                            <Shirt size={168} strokeWidth={0.25} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-1 text-center text-xs lg:text-sm">
                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span></span>
                                        <span>X</span>
                                        <span>Y</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>S</span>
                                        <span>43</span>
                                        <span>65</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>M</span>
                                        <span>45</span>
                                        <span>67</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>L</span>
                                        <span>47</span>
                                        <span>69</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>XL</span>
                                        <span>49</span>
                                        <span>71</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>2XL</span>
                                        <span>51</span>
                                        <span>73</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>3XL</span>
                                        <span>53</span>
                                        <span>75</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>4XL</span>
                                        <span>55</span>
                                        <span>77</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>5XL</span>
                                        <span>57</span>
                                        <span>79</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 even:bg-foreground even:bg-opacity-5">
                                        <span>6XL</span>
                                        <span>59</span>
                                        <span>81</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="grid">
                                <div className="font-semibold">Black jersey</div>
                                <div>
                                    <TShirt size={168} weight="thin" />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="font-semibold">White jersey</div>
                                <div>
                                    <TShirt size={168} weight="fill" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="rounded-full h-8 bg-primary text-primary-foreground grid place-content-center px-3">Tournament disc</span>
                </div>
            </div>
        </div>
    );
}

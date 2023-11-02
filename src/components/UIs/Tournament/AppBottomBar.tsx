import { Button } from "@/components/ui/button";
import { TrafficSign } from "@phosphor-icons/react";
import { Sheet } from "lucide-react";
import { MutableRefObject, forwardRef, useState, useEffect } from "react";

type Props = {
    active: string;
    onChange: (path: string) => void;
};

const AppBottomBar = forwardRef(({ active, onChange }: Props, ref) => {
    const [activePath, setActivePath] = useState(active);
    const handleChange = (path: string) => {
        setActivePath(path);
        onChange(path);
    };
    useEffect(() => {
        setActivePath(active);
    }, [active]);
    return (
        <section
            ref={ref as MutableRefObject<HTMLDivElement | null>}
            className={`fixed flex items-center justify-center transition-all ${activePath === "/tournament" ? "w-[calc(100dvw_-_2rem)] h-[calc(50dvh_-_2rem)] bottom-[calc(25dvh_-_1rem)] left-4 duration-400" : "w-[100dvw] h-24 bottom-0 left-0 p-4 duration-200"}`}
        >
            <nav
                className={`w-full flex items-center justify-around bg-primary text-primary-foreground bg-opacity-20 backdrop-blur rounded-2xl shadow-xl transition-all ${
                    activePath === "/tournament" ? "h-full grid-bg duration-400" : "h-16 max-w-sm duration-200"
                }`}
            >
                <Button onClick={() => handleChange("/tournament/guide")} variant={"ghost"} size={"icon-lg"} className={`flex-col rounded-full relative transition-all duration-300`}>
                    <div className={`absolute inset-0 z-0 rounded-full bg-primary transition-all duration-300 ${activePath === "/tournament/guide" ? "" : "scale-0 opacity-0"}`}></div>
                    <span className={`relative z-1 ${activePath === "/tournament/guide" ? "text-primary-foreground" : activePath === "/tournament" ? "" : "text-primary"}`}>
                        <TrafficSign size={24} weight="duotone" />
                    </span>
                    {activePath === "/tournament" && <span>Guide</span>}
                </Button>
                <Button onClick={() => handleChange("/tournament/schedule")} variant={"ghost"} size={"icon-lg"} className={`flex-col rounded-full relative transition-all duration-300`}>
                    <div className={`absolute inset-0 z-0 rounded-full bg-primary transition-all duration-300 ${activePath === "/tournament/schedule" ? "" : "scale-0 opacity-0"}`}></div>
                    <span className={`relative z-1 ${activePath === "/tournament/schedule" ? "text-primary-foreground" : activePath === "/tournament" ? "" : "text-primary"}`}>
                        <Sheet size={24} strokeWidth={1.25} fill="currentColor" fillOpacity={0.2} />
                    </span>
                    {activePath === "/tournament" && <span>Schedule</span>}
                </Button>
            </nav>
        </section>
    );
});

AppBottomBar.displayName = "AppBottomBar";
export default AppBottomBar;

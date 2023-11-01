import { Button } from "@/components/ui/button";
import { TrafficSign } from "@phosphor-icons/react";
import { Sheet } from "lucide-react";
import { MutableRefObject, forwardRef } from "react";

type Props = {
    active?:string;
    onChange: (path:string)=>void
};

const AppBottomBar = forwardRef(({ active, onChange }: Props, ref) => {
    return (
        <section
            ref={ref as MutableRefObject<HTMLDivElement | null>}
            className={`fixed bottom-0 w-[100dvw] flex items-center justify-center transition-all ${active === "/tournament" ? "h-[100dvh] duration-200" : "h-24 p-4 duration-300"}`}
        >
            <nav
                className={`w-full flex items-center justify-around bg-primary text-primary-foreground transition-all ${
                    active === "/tournament" ? "h-full grid-bg duration-200" : "rounded-2xl shadow-xl bg-opacity-20 backdrop-blur-sm h-16 max-w-sm duration-300"
                }`}
            >
                <Button onClick={() => onChange("/tournament/guide")} variant={"ghost"} size={"icon-lg"} className={`flex-col rounded-full relative transition-all duration-300`}>
                    <div className={`absolute inset-0 z-0 rounded-full bg-primary transition-all duration-300 ${active === "/tournament/guide" ? "" : "scale-0 opacity-0"}`}></div>
                    <span className={`relative z-1 ${active === "/tournament/guide" ? "text-primary-foreground" : active === "/tournament" ? "" : "text-primary"}`}>
                        <TrafficSign size={24} weight="duotone" />
                    </span>
                    {active === "/tournament" && <span>Guide</span>}
                </Button>
                <Button onClick={() => onChange("/tournament/schedule")} variant={"ghost"} size={"icon-lg"} className={`flex-col rounded-full relative transition-all duration-300`}>
                    <div className={`absolute inset-0 z-0 rounded-full bg-primary transition-all duration-300 ${active === "/tournament/schedule" ? "" : "scale-0 opacity-0"}`}></div>
                    <span className={`relative z-1 ${active === "/tournament/schedule" ? "text-primary-foreground" : active === "/tournament" ? "" : "text-primary"}`}>
                        <Sheet size={24} strokeWidth={1.25} fill="currentColor" fillOpacity={0.2} />
                    </span>
                    {active === "/tournament" && <span>Schedule</span>}
                </Button>
            </nav>
        </section>
    );
});

AppBottomBar.displayName = "AppBottomBar";
export default AppBottomBar;

export type IndicatorItem = {
    id: number;
    text: string;
    form?: React.ReactNode;
};

type Props = { className?: string; items: IndicatorItem[]; active: number };

export default function Indicator({ className = "", items, active }: Props) {
    return (
        <div
            className={`grid rounded-full overflow-hidden h-1.5 bg-foreground bg-opacity-10 backdrop-blur fixed top-0 left-1/2 -translate-x-1/2 z-20 w-full max-w-screen gap-px ${className}`}
            style={{ gridTemplateColumns: `repeat(${items.length},minmax(0,1fr))` }}
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`bg-foreground text-background flex items-center justify-center transition-all ease-in-out origin-left ${
                        item.id <= active ? "bg-opacity-100 duration-300" : "bg-opacity-0 -translate-x-full duration-200"
                    } ${item.id === active ? "rounded rounded-l-[1px]" : "rounded-[1px]"}`}
                ></div>
            ))}
        </div>
    );
}

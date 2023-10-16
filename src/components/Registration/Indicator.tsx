export type IndicatorItem = {
    id: number;
    text: string;
    form?: React.ReactNode;
};

type Props = { className?: string; items: IndicatorItem[]; active: number };

export default function Indicator({ className = "", items, active }: Props) {
    return (
        <div
            className={`grid rounded-full overflow-hidden h-1.5 bg-light bg-opacity-10 backdrop-blur fixed top-0 left-1/2 -translate-x-1/2 z-[1] w-full max-w-screen gap-0.5 ${className}`}
            style={{ gridTemplateColumns: `repeat(${items.length},minmax(0,1fr))` }}
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`bg-light text-on-light flex items-center justify-center transition-all ease-in-out origin-left ${
                        item.id <= active ? "bg-opacity-100 scale-x-100" : "bg-opacity-0 scale-x-0"
                    } ${item.id === active ? "rounded-r-full" : ""}`}
                ></div>
            ))}
        </div>
    );
}

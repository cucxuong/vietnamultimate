"use client";

import { UIEvent, useState } from "react";

export type ScrollTarget = {
    top: number;
    bottom:number;
    height: number;
    isDown: boolean;
    isEnd: boolean;
};
type Props = {
    className?: string;
    scroll?: "x" | "y" | "auto" | "none";
    children?: React.ReactNode;
    onScroll?: (v: ScrollTarget) => void;
};
export default function ScrollArea({ className = "flex items-center gap-4", scroll = "y", children, onScroll = (v: ScrollTarget) => {} }: Props) {
    const [scrollTop, setScrollTop] = useState(0);
    return (
        <div
            className={`${scroll === "x" ? "overflow-x-auto overflow-y-hidden" : ""} ${scroll === "y" ? "overflow-x-hidden overflow-y-auto" : ""} ${
                scroll === "auto" ? "overflow-x-auto overflow-y-auto" : ""
            } ${scroll === "none" ? "overflow-x-hidden overflow-y-hidden" : ""}   ${className}`}
            onScroll={(e) => {
                onScroll({
                    top: e.currentTarget.scrollTop,
                    bottom: e.currentTarget.scrollHeight - e.currentTarget.clientHeight,
                    height: e.currentTarget.scrollHeight,
                    isDown: e.currentTarget.scrollTop > scrollTop,
                    isEnd: e.currentTarget.scrollTop >= e.currentTarget.scrollHeight - e.currentTarget.clientHeight,
                });
                setScrollTop(e.currentTarget.scrollTop);
            }}
        >
            {children}
        </div>
    );
}

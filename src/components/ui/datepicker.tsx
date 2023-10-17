"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X } from "@phosphor-icons/react";

type Props = {
    placeholder?: string;
    value: Date | undefined;
    onChange: (v: Date | undefined) => void;
};
export function DatePicker({ placeholder = "Pick a date", value, onChange }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("justify-start text-left font-normal", !value && "text-muted-foreground")}>
                    <span className="mr-auto">{value ? format(value, "dd.MM.yyyy") : <span className="opacity-30">{placeholder}</span>}</span>
                    {value ? (
                        <Button
                            asChild
                            variant={"ghost"}
                            size={"icon-xs"}
                            className="ml-2 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(undefined);
                            }}
                        >
                            <span>
                                <X size={16} weight="bold" />
                            </span>
                        </Button>
                    ) : (
                        <CalendarIcon size={18} className="ml-2 text-inherit opacity-30" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
            </PopoverContent>
        </Popover>
    );
}

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "@phosphor-icons/react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    clearable?: boolean;
    onChange: (v: any) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, clearable, onChange, ...props }, ref) => {
    return (
        <div className="relative inline-grid grid-cols-1">
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
            {clearable && props.value && (
                <Button
                    variant={"ghost"}
                    size={"icon-xs"}
                    tabIndex={-1}
                    className="rounded-full absolute top-1/2 -translate-y-1/2 right-4"
                    onClick={(e) => {
                        e.stopPropagation();
                        onChange("");
                    }}
                >
                    <span>
                        <X size={16} weight="bold" />
                    </span>
                </Button>
            )}
        </div>
    );
});
Input.displayName = "Input";

export { Input };

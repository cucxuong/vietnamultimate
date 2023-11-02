import { MutableRefObject, forwardRef } from "react";

type Props = {
    className?: string;
    children?: React.ReactNode;
};
const Main = forwardRef(({ className = "", children }: Props, ref) => {
    return (
        <main
            ref={ref as MutableRefObject<HTMLDivElement | null>}
            className={`flex flex-col mx-auto w-full max-w-screen-lg p-6 ${className}`}
        >
            {children}
        </main>
    );
});
Main.displayName = "Main";
export default Main;

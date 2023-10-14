type Props = {
    className?: string;
    children?: React.ReactNode
};
export default function Main({ className = "", children }: Props) {
    return <main className={`flex flex-col mx-auto w-full max-w-screen-2xl min-h-[calc(100dvh_-_var(--header-h,0px)_-_var(--footer-h,0px))] p-6 ${className}`}>{children}</main>;
}

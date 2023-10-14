type Props = {
    className?: string;
};
export default function Footer({ className = "min-h-[var(--footer-h,20dvh)]" }: Props) {
    return (
        <footer className={`invert bg-dark text-on-dark p-6 ${className}`}>
            <div className="w-full mx-auto max-w-screen-2xl px-6">Footer</div>
        </footer>
    );
}

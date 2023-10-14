import Navbar from "@/components/UIs/Navbar";

type Props = {
    className?: string;
};
export default function Header({ className = "sticky top-0 bg-dark bg-opacity-80 h-14 2xl:h-[var(--header-h,3.5rem)] flex items-center z-10 backdrop-blur" }: Props) {
    return (
        <header className={className}>
            <div className="w-full mx-auto max-w-screen-2xl px-6">
                <Navbar />
            </div>
        </header>
    );
}

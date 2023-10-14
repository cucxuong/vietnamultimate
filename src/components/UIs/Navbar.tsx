import Link from "next/link";

export type menuItem = { key: string; text: string; path: string; icon: React.ReactNode };
type Props = {
    className?: string;
    items?: menuItem[];
};

const menu: menuItem[] = [
    { key: "menu-2", text: "Registration", path: "/registration", icon: <></> },
];
export default function Navbar({ className = "flex items-center gap-4", items = menu }: Props) {
    return (
        <nav className={className}>
            Menu
            {items.map((item) => (
                <Link key={item.key} href={item.path} className="text-on-dark">
                    <span>{item.text}</span>
                </Link>
            ))}
        </nav>
    );
}

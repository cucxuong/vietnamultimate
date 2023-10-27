import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");
const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-barlow)", ...fontFamily.sans],
                mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                dark: "rgba(var(--background-start-rgb),  <alpha-value>)",
                light: "rgba(var(--foreground-rgb), <alpha-value>)",
                on: { dark: "rgba(var(--foreground-rgb), <alpha-value>)", light: "rgba(var(--background-start-rgb), <alpha-value>)" },
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "shake-horizontal": {
                    "0%,100%": { transform: "translateX(0)" },
                    "10%,30%,50%,70%": { transform: "translateX(-10px)" },
                    "20%,40%,60%": { transform: "translateX(10px)" },
                    "80%": { transform: "translateX(8px)" },
                    "90%": { transform: "translateX(-8px)" },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "floating-hoz": {
                    "0%": { transform: "translateX(0)", opacity: "0" },
                    "50%": { opacity: "1" },
                    "100%": { transform: "translateX(100%)", opacity: "0" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0)", opacity: "0" },
                    "90%": { transform: "scale(1.2)", opacity: "1" },
                    "95%": { transform: "scale(0.9)", opacity: "1" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
            animation: {
                "shake-horizontal": "shake-horizontal .4s cubic-bezier(.455,.03,.515,.955) both",
                "floating-hoz": "floating-hoz 3s infinite ease-in-out",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "scale-in": "scale-in 1s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;

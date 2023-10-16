import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                dark: "rgba(var(--background-start-rgb),  <alpha-value>)",
                light: "rgba(var(--foreground-rgb), <alpha-value>)",
                on: { dark: "rgba(var(--foreground-rgb), <alpha-value>)", light: "rgba(var(--background-start-rgb), <alpha-value>)" },
            },
            animation: {
                "shake-horizontal": "shake-horizontal .4s cubic-bezier(.455,.03,.515,.955) both",
            },
            keyframes: {
                "shake-horizontal": {
                    "0%,100%": { transform: "translateX(0)" },
                    "10%,30%,50%,70%": { transform: "translateX(-10px)" },
                    "20%,40%,60%": { transform: "translateX(10px)" },
                    "80%": { transform: "translateX(8px)" },
                    "90%": { transform: "translateX(-8px)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;

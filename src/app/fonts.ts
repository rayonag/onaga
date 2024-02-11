import { Inter, Roboto_Mono, Abril_Fatface } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto_mono",
});

export const abril = Abril_Fatface({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-abril",
});

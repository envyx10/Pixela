import { Roboto, Open_Sans, Outfit } from "next/font/google";

export const roboto = Roboto({
    subsets: ["latin", "latin-ext"],
    weight:  ["400"],
    variable: "--font-roboto",
    fallback: ['system-ui', 'Arial', 'sans-serif'],
  });

export const openSans = Open_Sans({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "700"],
    variable: "--font-open-sans",
    fallback: ['system-ui', 'Arial', 'sans-serif'],
  });
  
export const outfit = Outfit({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "700", "900"],
    variable: "--font-sans",
    fallback: ['system-ui', 'Arial', 'sans-serif'],
  });
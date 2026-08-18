import { Lora, DM_Sans } from "next/font/google";

export const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif-family",
  display: "swap",
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

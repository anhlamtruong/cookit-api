"use client";
import { cn } from "@/lib/utils";
import { Reenie_Beanie } from "next/font/google";
import { LandingPageAdmin } from "./landing_page_admin";
export const reenie_beanie = Reenie_Beanie({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

const MainApp = () => {
  return (
    <main
      className={cn(`flex w-full flex-col items-center justify-center h-full`)}
    >
      <LandingPageAdmin></LandingPageAdmin>
    </main>
  );
};

export default MainApp;

"use client";

import LoginButton from "@/components/auth/login_button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const LandingPageAdmin = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 z-50"
      >
        <div className=" flex text-3xl md:text-7xl font-bold text-center">
          Start your own side-hustle ,create your community NOW
        </div>
        <div className="font-extralight text-base md:text-4xl py-4">
          Become a home cook chef
        </div>
        <div>
          <LoginButton>
            <Button
              className="ease-in-out duration-300"
              withTheme={true}
              size={"lg"}
            >
              {" "}
              Sign In
            </Button>
          </LoginButton>
        </div>
      </motion.div>
      <BackgroundBeams></BackgroundBeams>
    </>
  );
};

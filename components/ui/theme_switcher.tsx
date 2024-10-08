"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Theme, themeIcons, useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, TowerControl, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeSwitcher = ({ horizontal = false }: { horizontal?: boolean }) => {
  const { theme, setTheme, themeColors } = useTheme();
  const [icon, setIcon] = useState<React.ReactNode>(themeIcons.light);
  const { backgroundPrimary, textPrimary, hoverBorder, hoverBackground } =
    themeColors[theme];
  const [isOpen, setIsOpen] = useState(false);
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme as Theme);
    setIcon(themeIcons[newTheme]);
    setIsOpen(false);
  };
  const containerStyle = useMemo(() => {
    return {
      backgroundColor: backgroundPrimary,
      color: textPrimary,

      outline: "1px solid transparent",
      transformOrigin: "top",
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
    };
  }, [backgroundPrimary, textPrimary]);
  const containerStyleHorizontal = useMemo(() => {
    return {
      backgroundColor: backgroundPrimary,
      color: textPrimary,
      outline: "1px solid transparent",
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
      top: 0, // Align to the top of the button
      left: "100%", // Position to the right of the button
      transformOrigin: "top left",
    };
  }, [backgroundPrimary, textPrimary]);
  const handleMouseEnter = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.outlineColor = hoverBorder;
    event.currentTarget.style.backgroundColor = hoverBackground;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.backgroundColor = backgroundPrimary;
    event.currentTarget.style.outlineColor = "transparent";
  };

  const dropdownVariants = horizontal
    ? {
        open: {
          opacity: 1,
          scaleX: 1,
          width: "auto", // Ensure the width can adjust based on content, or set a specific width
          transition: {
            opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            scaleX: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          },
        },
        closed: {
          opacity: 0,
          scaleX: 0,
          width: 0, // Collapse the width when closed
          transition: {
            opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            scaleX: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
          },
        },
      }
    : {
        open: {
          opacity: 1,
          scaleY: 1,
          height: "auto",
          transition: {
            opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            scaleY: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          },
        },
        closed: {
          opacity: 0,
          scaleY: 0,
          height: 0,
          transition: {
            opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            scaleY: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
          },
        },
      };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative font-medium inline-block rounded  text-md align-middle border"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`p-2 rounded-md  transition ease-in-out 
        focus:ring-2 focus:ring-offset-2 focus:outline-none`}
      >
        {icon}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            style={horizontal ? containerStyleHorizontal : containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variants={dropdownVariants}
            className={cn(
              horizontal
                ? "flex rounded z-10 mt-2  border shadow "
                : `rounded z-10 mt-2  border shadow`
            )}
          >
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`p-2 cursor-pointer  }`}
              onClick={() => handleThemeChange("light")}
            >
              <Sun></Sun>
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`p-2 cursor-pointer `}
              onClick={() => handleThemeChange("dark")}
            >
              <Moon></Moon>
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`p-2 cursor-pointer `}
              onClick={() => handleThemeChange("ocean-blue")}
            >
              <Waves></Waves>
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`p-2 cursor-pointer `}
              onClick={() => handleThemeChange("tokyo-night")}
            >
              <TowerControl></TowerControl>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;

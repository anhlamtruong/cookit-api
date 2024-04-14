import type { Config } from "tailwindcss";
const {fontFamily} = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      zinc: {
        "50": "#fafafa",
        "100": "#f4f4f5",
        "200": "#e4e4e7",
        "300": "#d4d4d8",
        "400": "#a1a1aa",
        "500": "#71717a",
        "600": "#52525b",
        "700": "#3f3f46",
        "800": "#27272a",
        "900": "#18181b", 
        "950": "#09090b"
      },
      
      light: {
        backgroundPrimary: "#ffffff",
        backgroundSecondary: "#e0e0e0",
        backgroundTertiary: "#bdbdbd",
        backgroundPrimaryOpacity: "rgba(255, 255, 255, 0.9)",
        backgroundSecondaryOpacity: "rgba(224, 224, 224, 0.9)",
        backgroundTertiaryOpacity: "rgba(189, 189, 189, 0.9)",
        textPrimary: "#212121",
        textSecondary: "#757575",
        textTertiary: "#9e9e9e",
        textTint: "#e0e0e0",
        textShade: "#616161",
        borderPrimary: "#e0e0e0",
        borderSecondary: "#bdbdbd",
        hoverText: "#3b82f6",
        hoverBorder: "#010408",
        hoverBackground: "#3b82f6",
      },
      dark: {
        backgroundPrimary: "#212121",
        backgroundSecondary: "#424242",
        backgroundTertiary: "#616161",
        backgroundPrimaryOpacity: "rgba(33, 33, 33, 0.9)",
        backgroundSecondaryOpacity: "rgba(66, 66, 66, 0.9)",
        backgroundTertiaryOpacity: "rgba(97, 97, 97, 0.9)",
        textPrimary: "#ffffff",
        textSecondary: "#bdbdbd",
        textTertiary: "#9e9e9e",
        textTint: "#757575",
        textShade: "#424242",
        borderPrimary: "#616161",
        borderSecondary: "#424242",
        hoverText: "#ec4899",
        hoverBorder: "#424242",
        hoverBackground: "#8b5cf6",
      },
      "ocean-blue": {
        backgroundPrimary: "#0288d1",
        backgroundSecondary: "#03a9f4",
        backgroundTertiary: "#4fc3f7",
        backgroundPrimaryOpacity: "rgba(2, 136, 209, 0.9)",
        backgroundSecondaryOpacity: "rgba(3, 169, 244, 0.9)",
        backgroundTertiaryOpacity: "rgba(79, 195, 247, 0.9)",
        textPrimary: "#01579b",
        textSecondary: "#0277bd",
        textTertiary: "#0288d1",
        textTint: "#4fc3f7",
        textShade: "#03a9f4",
        borderPrimary: "#0277bd",
        borderSecondary: "#0288d1",
        hoverText: "#f48c06",
        hoverBorder: "#4fc3f7",
        hoverBackground: "#0288d1",
      },
      "tokyo-night": {
        backgroundPrimary: "#1a202c",
        backgroundSecondary: "#2d3748",
        backgroundTertiary: "#4a5568",
        backgroundPrimaryOpacity: "rgba(26, 32, 44, 0.9)",
        backgroundSecondaryOpacity: "rgba(45, 55, 72, 0.9)",
        backgroundTertiaryOpacity: "rgba(74, 85, 104, 0.9)",
        textPrimary: "#edf2f7",
        textSecondary: "#a0aec0",
        textTertiary: "#718096",
        textTint: "#e2e8f0",
        textShade: "#a0aec0",
        borderPrimary: "#4a5568",
        borderSecondary: "#2d3748",
        hoverText: "#f56565",
        hoverBorder: "#2d3748",
        hoverBackground: "#f56565",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        aurora: "aurora 60s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    addVariablesForColors,
  ],
} satisfies Config;

export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

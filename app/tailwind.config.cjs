/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* Squadly palette — design.md §2 */
        pine: {
          DEFAULT: "#0C2B1C",
          800: "#123A28",
        },
        pitch: {
          DEFAULT: "#16A34A",
          dark: "#15803D",
        },
        lime: "#A3E635",
        sun: {
          DEFAULT: "#FFC53D",
          dark: "#8A6400",
        },
        coral: "#FF6B57",
        paper: "#FAF9F4",
        mist: "#EDF6EF",
        sand: "#F3EFE4",
        ink: {
          DEFAULT: "#12211A",
          soft: "#51645A",
          faint: "#8AA093",
        },
        line: "#E4E9E1",
        wa: "#25D366",
        "wa-bubble-out": "#D9FDD3",
        "wa-bubble-in": "#FFFFFF",
        read: "#53BDEB",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "system-ui", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        card: "20px",
        panel: "28px",
        bubble: "18px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 1px 2px rgba(12,43,28,.05), 0 8px 24px -8px rgba(12,43,28,.10)",
        lift: "0 2px 4px rgba(12,43,28,.06), 0 16px 40px -12px rgba(12,43,28,.18)",
        pop: "0 24px 64px -16px rgba(12,43,28,.28)",
        "glow-lime": "0 0 40px rgba(163,230,53,.35)",
      },
      backgroundImage: {
        "gradient-pitch": "linear-gradient(135deg, #16A34A 0%, #0C2B1C 100%)",
        "gradient-sun": "linear-gradient(90deg, #FFC53D 0%, #FFB020 100%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".45" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

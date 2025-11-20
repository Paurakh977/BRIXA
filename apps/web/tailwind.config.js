import sharedConfig from "@repo/tailwind-config/tailwind.config.js";

export default {
  ...sharedConfig,
  content: [
    ...sharedConfig.content,
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme?.extend,
      colors: {
        brand: {
          50: "#F7F5F3",
          100: "#EFEBE8",
          200: "#DCD4CE",
          300: "#C9BDB4",
          400: "#A69284",
          500: "#8C7565",
          600: "#6D584A",
          700: "#594A3C",
          800: "#4A3728",
          900: "#2E231A",
        },
        canvas: {
          DEFAULT: "#FAFAF9",
          paper: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
      },
    },
  },
  plugins: sharedConfig.plugins || [],
};

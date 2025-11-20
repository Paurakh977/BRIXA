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
          50: "#F9F8F6",
          100: "#EFEBE6",
          200: "#DCD5CD",
          300: "#BDB3A8",
          400: "#9E8F82",
          500: "#857263",
          600: "#6B584A",
          700: "#524236",
          800: "#3D3026",
          900: "#261C15",
        },
        canvas: {
          DEFAULT: "#FAFAF9",
          paper: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        serif: ["Playfair Display", "Merriweather", "serif"],
      },
      backgroundImage: {
        noise: "url('https://www.transparenttextures.com/patterns/stardust.png')",
      },
    },
  },
  plugins: sharedConfig.plugins || [],
};

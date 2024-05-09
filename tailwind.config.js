import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    
    extend: {
      animation: {
        'fade-in-left': 'wiggle 1s ease-in-out infinite',
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: 'var(--color-secondary)',
        tbase: 'var(--color-tbase)',
        tcontrast: 'var(--color-tcontrast)',
      },
      keyframes: {
        'fade-in-left': {
          "0%": {
            opacity: 0,
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      },
    }
 
  },
  plugins: [flowbite.plugin()],
};

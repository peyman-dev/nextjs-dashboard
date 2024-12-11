/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

    },
  },
  plugins: [function ({ addVariant }) {
    addVariant("child", "& > *")
    addVariant("child-hover", "& > *:hover")
    addVariant("child-active", "& > *:active")
    addVariant("child-focus", "& > *:focus")
  }],
}

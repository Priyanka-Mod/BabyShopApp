/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {colors:{
      black:'#000',
      white:'#fff',
      primary:'#E4097D',
      lightpink:'#FEF1F8',
      lightgray:'#bfbfbf',
      lightergray:'#f4f4f4',
      darkgray:'#5A5A5A',
      blue:'#0A85D6',
      lightblue:'#A1D5F0',
      green:'#75C34B'
    }},
  },
  plugins: [],
}


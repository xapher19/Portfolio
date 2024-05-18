/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["nord", 
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#5e81ac",
          accent: "#88c0d0",

        },
      },
    ],
  },
}


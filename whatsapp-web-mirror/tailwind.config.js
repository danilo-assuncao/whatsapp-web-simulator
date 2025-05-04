/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'whatsapp': {
          'light-bg': '#f0f2f5',
          'chat-bg': '#efeae2',
          'incoming': '#ffffff',
          'outgoing': '#d9fdd3',
          'header': '#f0f2f5',
          'primary': '#00a884',
        }
      }
    },
  },
  plugins: [],
} 
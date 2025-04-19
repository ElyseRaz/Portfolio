// tailwind.config.js
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          title: ['var(--font-noto)'],
          body: ['var(--font-radio)'],
        },
        color:{
            primary : 'var(--color-primary)',
        },
      },
    },
    plugins: [
      require('@tailwindcss/motion'),
    ],
  }

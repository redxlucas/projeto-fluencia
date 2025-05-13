const { createThemes } = require('tw-colors')

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extends: {
            colors: {
                primary: 'steelblue',
                secondary: 'darkblue',
                brand: '#F3F3F3',
                // ...other colors
            },
        },
    },
    plugins: [
        createThemes({
            light: {
                primary: 'steelblue',
                secondary: 'darkblue',
                brand: '#F3F3F3',
                // ...other colors
            },
        }),
    ],
}

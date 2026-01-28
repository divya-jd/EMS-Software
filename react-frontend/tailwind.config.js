/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Professional Eco-Tech Palette (Light Mode)
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981', // Emerald 500 (Main Brand)
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                },
                surface: {
                    ground: '#f8fafc', // Slate 50 (Page Bg)
                    card: '#ffffff',   // White (Card Bg)
                    border: '#e2e8f0', // Slate 200 (Borders)
                    text: '#0f172a',   // Slate 900 (Main Text)
                    muted: '#64748b',  // Slate 500 (Secondary Text)
                },
                accent: {
                    light: '#e0f2fe', // Sky 100
                    main: '#0ea5e9', // Sky 500
                    dark: '#0369a1', // Sky 700
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}

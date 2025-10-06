// apps/storefront/tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    500: "#ef4444",
                    600: "#dc2626",
                },
            },
            boxShadow: {
                card: "0 8px 24px rgba(0,0,0,.08)",
            },
        },
    },
    plugins: [],
};

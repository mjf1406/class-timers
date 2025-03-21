/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
    mode: "jit",
    // darkMode: 'class',
    content: ["../index.html", "../wordSearch.js", "../js/centers.js"],
    theme: {
        extend: {
            screens: {
                "min-1860": "1860px",
            },
        },
    },
    plugins: [],
};

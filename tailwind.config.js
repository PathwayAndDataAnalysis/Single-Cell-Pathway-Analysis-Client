/** @type {(tailwindConfig: object) => object} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["Open Sans", "sans-serif"],
            serif: ["Roboto Slab", "serif"],
            body: ["Roboto", "sans-serif"],
        },
    },
    plugins: [],
});


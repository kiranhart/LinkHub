/** @type {import("prettier").Config} */
module.exports = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    printWidth: 180,
};

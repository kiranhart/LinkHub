/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: ['prettier-plugin-tailwindcss'],
	tabWidth: 4,
	jsxSingleQuote: true,
	singleQuote: true,
	useTabs: true,
	printWidth: 200,
	semi: true
};

export default config;

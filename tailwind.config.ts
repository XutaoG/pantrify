import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
		},
		screens: {
			"custom-sm": "480px",
			"custom-md": "820px",
			"custom-lg": "1140px",
			"custom-3xl": "1860px",
			"custom-4xl": "2320px",
			"custom-5xl": "2570px",
		},
	},
	plugins: [],
};
export default config;

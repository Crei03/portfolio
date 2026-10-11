import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
	theme: {
		extend: {
			// Colors resolve to CSS variables so light/dark themes switch in one place (Layout.astro).
			colors: {
				paper: 'var(--paper)',
				sumi: { DEFAULT: 'var(--sumi)', soft: 'var(--sumi-soft)' },
				muted: 'var(--muted)',
				vermilion: { DEFAULT: 'var(--vermilion)', dark: 'var(--vermilion-dark)' },
				ochre: 'var(--ochre)',
				peach: 'var(--peach)',
				sand: 'var(--sand)',
			},
			fontFamily: {
				mincho: ['"Shippori Mincho"', ...defaultTheme.fontFamily.serif],
				sans: ['"Zen Kaku Gothic New"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}

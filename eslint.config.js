// @ts-check
import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

const typescriptEslint = tseslint.plugin;
const tsParser = tseslint.parser;

export default tseslint.config(
	{
		ignores: [
			'**/node_modules',
			'**/dist',
			'dist/**/*',
			'**/node_modules',
			'**/target',
			'**/.vercel',
			'**/.astro',
			'**/.github',
		],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
		},
	},

	// Astro
	...eslintPluginAstro.configs.recommended,

	{
		files: [
			'**/*.astro', // eslint-plugin-astro does not type Astro.props correctly in some contexts, so a bunch of things ends up being any
		],
		rules: {
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
		},
	},

	// Disable typed rules for scripts inside Astro files
	// https://github.com/ota-meshi/eslint-plugin-astro/issues/240
	{
		files: ['**/*.astro/*.ts'],
		languageOptions: {
			parserOptions: {
				project: null,
			},
		},
		...tseslint.configs.disableTypeChecked,
	},

	{
		files: ['test/**/*.test.ts'],
		rules: {
			// Since ESLint does not the Astro language
			'@typescript-eslint/no-unsafe-argument': 'off',
		},
	}
);

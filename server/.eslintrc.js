module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'max-len': ['warn', { code: 150 }],
    'object-curly-spacing': ['warn', 'always'],
  }
}
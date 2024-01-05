const stylisticPlugin = require('@stylistic/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const perfectionist = require('eslint-plugin-perfectionist');

module.exports = [
	{
		files: [ '**/*.js', '**/*.ts', '**/*.tsx' ],
		languageOptions: {
			ecmaVersion: 'latest',
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: true,
				ecmaVersion: 'latest',
				project: './tsconfig.json',
				tsconfigRootDir: '.',
			},
			sourceType: 'module',
		},
	},
	{
		plugins: {
			perfectionist,
		},
		rules: {
			...perfectionist.configs['recommended-natural'].rules,
		},
	},
	stylisticPlugin.configs['all-flat'],
	{
		rules: {
			'@stylistic/array-bracket-newline': [ 'error', 'consistent' ],
			'@stylistic/array-bracket-spacing': [ 'error', 'always' ],
			'@stylistic/array-element-newline': [ 'error', 'consistent' ],
			'@stylistic/comma-dangle': [ 'error', 'always-multiline' ],
			'@stylistic/dot-location': [ 'error', 'property' ],
			'@stylistic/function-call-argument-newline': [ 'error', 'consistent' ],
			'@stylistic/function-paren-newline': [ 'error', 'consistent' ],
			'@stylistic/indent': [ 'error', 'tab' ],
			'@stylistic/jsx-child-element-spacing': 'off',
			'@stylistic/jsx-indent': [
				'error',
				'tab',
				{
					checkAttributes: true,
					indentLogicalExpressions: true,
				},
			],
			'@stylistic/jsx-indent-props': [ 'error', 'tab' ],
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/jsx-wrap-multilines': [
				'error',
				{
					arrow: 'parens',
					assignment: 'parens',
					condition: 'ignore',
					declaration: 'parens',
					logical: 'ignore',
					prop: 'ignore',
					return: 'parens',
				},
			],
			'@stylistic/max-len': [ 'error', { code: 120 } ],
			'@stylistic/multiline-ternary': [ 'error', 'always-multiline' ],
			'@stylistic/no-extra-parens': 'off',
			'@stylistic/no-tabs': 'off',
			'@stylistic/object-curly-newline': [ 'error', { consistent: true } ],
			'@stylistic/object-curly-spacing': [ 'error', 'always' ],
			'@stylistic/object-property-newline': [ 'error', { allowMultiplePropertiesPerLine: true } ],
			'@stylistic/padded-blocks': [ 'error', 'never' ],
			'@stylistic/quote-props': [ 'error', 'as-needed' ],
			'@stylistic/quotes': [ 'error', 'single' ],
			'@stylistic/semi': [ 'error', 'always' ],
		},
	},
	{
		rules: {
			'newline-before-return': [ 'error' ],
			'prefer-template': [ 'error' ],
		},
	},
];

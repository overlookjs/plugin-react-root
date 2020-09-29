/* --------------------
 * @overlook/plugin-react-root module
 * Tests ESLint config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	extends: [
		'@overlookmotel/eslint-config-jest'
	],
	rules: {
		'import/no-unresolved': ['error', {ignore: ['^@overlook/plugin-react-root(/|$)']}],
		'node/no-missing-require': ['error', {allowModules: ['@overlook/plugin-react-root']}],
		'node/no-missing-import': ['error', {allowModules: ['@overlook/plugin-react-root']}]
	},
	overrides: [{
		files: ['*.mjs'],
		parserOptions: {
			sourceType: 'module'
		},
		rules: {
			'node/no-unsupported-features/es-syntax': ['error', {ignores: ['modules']}]
		}
	}]
};

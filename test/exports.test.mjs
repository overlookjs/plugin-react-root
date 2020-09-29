/* --------------------
 * @overlook/plugin-react-root module
 * Tests
 * ESM export
 * ------------------*/

// Modules
import Plugin from '@overlook/plugin';
import reactRootPlugin, * as namedExports from '@overlook/plugin-react-root/es';

// Imports
import itExports from './exports.js';

// Tests

describe('ESM export', () => {
	it('default export is an instance of Plugin class', () => {
		expect(reactRootPlugin).toBeInstanceOf(Plugin);
	});

	describe('default export has properties', () => {
		itExports(reactRootPlugin);
	});

	describe('named exports', () => {
		itExports(namedExports);
	});
});

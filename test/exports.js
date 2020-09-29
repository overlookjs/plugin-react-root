/* --------------------
 * @overlook/plugin-react-root module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(reactRootPlugin) {
	describe.skip('methods', () => { // eslint-disable-line jest/no-disabled-tests
		it.each([
			'TEMP'
		])('%s', (key) => {
			expect(reactRootPlugin[key]).toBeFunction();
		});
	});

	describe('symbols', () => {
		it.each([
			'TEMP'
		])('%s', (key) => {
			expect(typeof reactRootPlugin[key]).toBe('symbol');
		});
	});
};

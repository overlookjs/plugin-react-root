/* --------------------
 * @overlook/plugin-react-root module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(reactRootPlugin) {
	describe('symbols', () => {
		it.each([
			'GET_REACT_ROOT_FILE'
		])('%s', (key) => {
			expect(typeof reactRootPlugin[key]).toBe('symbol');
		});
	});
};

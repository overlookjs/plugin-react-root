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
			'REACT_ROOT_FILE',
			'GET_REACT_ROOT_FILE',
			'CREATE_REACT_ROOT_FILE',
			'REACT_HTML_FILE',
			'GET_REACT_HTML_FILE',
			'CREATE_REACT_HTML_FILE'
		])('%s', (key) => {
			expect(typeof reactRootPlugin[key]).toBe('symbol');
		});
	});
};

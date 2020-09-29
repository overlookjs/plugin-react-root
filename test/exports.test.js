/* --------------------
 * @overlook/plugin-react-root module
 * Tests
 * CJS export
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	reactRootPlugin = require('@overlook/plugin-react-root');

// Imports
const itExports = require('./exports.js');

// Tests

describe('CJS export', () => {
	it('is an instance of Plugin class', () => {
		expect(reactRootPlugin).toBeInstanceOf(Plugin);
	});

	describe('has properties', () => {
		itExports(reactRootPlugin);
	});
});

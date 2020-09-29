/* --------------------
 * @overlook/plugin-react-root module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	Route = require('@overlook/route'),
	reactRootPlugin = require('@overlook/plugin-react-root');

// Init
require('./support/index.js');

// Tests

describe('Plugin', () => {
	it('is an instance of Plugin class', () => {
		expect(reactRootPlugin).toBeInstanceOf(Plugin);
	});

	it('when passed to `Route.extend()`, returns subclass of Route', () => {
		const ReactRootRoute = Route.extend(reactRootPlugin);
		expect(ReactRootRoute).toBeFunction();
		expect(ReactRootRoute).toBeDirectSubclassOf(Route);
	});
});

/* --------------------
 * @overlook/plugin-react-root module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	Route = require('@overlook/route'),
	reactPlugin = require('@overlook/plugin-react'),
	staticPlugin = require('@overlook/plugin-static'),
	reactRootPlugin = require('@overlook/plugin-react-root');

// Init
require('./support/index.js');

// Tests

describe('Plugin', () => {
	it('is an instance of Plugin class', () => {
		expect(reactRootPlugin).toBeInstanceOf(Plugin);
	});

	it('when passed to `Route.extend()`, returns subclass of Route', () => {
		const ReactRootRoute = Route.extend(reactRootPlugin),
			StaticRoute = Route.extend(staticPlugin),
			ReactRoute = StaticRoute.extend(reactPlugin);
		expect(ReactRootRoute).toBeFunction();
		expect(ReactRootRoute).toBeSubclassOf(Route);
		expect(ReactRootRoute).toBeSubclassOf(StaticRoute);
		expect(ReactRootRoute).toBeDirectSubclassOf(ReactRoute);
	});
});

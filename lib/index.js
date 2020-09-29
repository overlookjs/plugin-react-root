/* --------------------
 * @overlook/plugin-react-root module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	{INIT_CHILDREN} = require('@overlook/route'),
	reactPlugin = require('@overlook/plugin-react'),
	staticPlugin = require('@overlook/plugin-static');

// Imports
const pkg = require('../package.json');

// Exports

module.exports = new Plugin(
	pkg,
	[staticPlugin, reactPlugin],
	{symbols: ['GET_REACT_ROOT_FILE']},
	(Route, {GET_REACT_ROOT_FILE}) => class ReactRootRoute extends Route {
		async [INIT_CHILDREN]() {
			await super[INIT_CHILDREN]();

			const file = this[GET_REACT_ROOT_FILE](); // eslint-disable-line no-unused-vars

			// TODO Pass to `@overlook/plugin-bundle` to be entry file
			// this[ADD_ENTRY](file);
		}

		/*
		async [BUNDLE]() {
			await super[BUNDLE]();

			// TODO Get HTML file from bundle
			const htmlFile = ...
			this[STATIC_FILE] = htmlFile;
		}
		*/
	}
);

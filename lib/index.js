/* --------------------
 * @overlook/plugin-react-root module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	{INIT_PROPS, INIT_ROUTE, INIT_CHILDREN} = require('@overlook/route'),
	reactPlugin = require('@overlook/plugin-react'),
	staticPlugin = require('@overlook/plugin-static'),
	{FILES} = require('@overlook/plugin-load'),
	{PRE_BUILD, deleteRouteProperties} = require('@overlook/plugin-build'),
	{BUNDLE_ADD_ENTRY} = require('@overlook/plugin-bundle'),
	{findParentOrSelf} = require('@overlook/util-find-parent'),
	assert = require('simple-invariant');

// Imports
const createRoot = require('./createRoot.js'),
	createHtml = require('./createHtml.js'),
	pkg = require('../package.json');

// Constants
const ROOT_EXT = 'root.jsx',
	HTML_EXT = 'html',
	CONTAINER_ID = 'app';

// Exports

module.exports = new Plugin(
	pkg,
	[staticPlugin, reactPlugin],
	{
		symbols: [
			'REACT_ROOT_FILE', 'GET_REACT_ROOT_FILE', 'CREATE_REACT_ROOT_FILE',
			'REACT_HTML_FILE', 'GET_REACT_HTML_FILE', 'CREATE_REACT_HTML_FILE'
		]
	},
	(Route, {
		REACT_ROOT_FILE, GET_REACT_ROOT_FILE, CREATE_REACT_ROOT_FILE,
		REACT_HTML_FILE, GET_REACT_HTML_FILE, CREATE_REACT_HTML_FILE,
		REACT_FILE, REACT_ROOT, STATIC_FILE, WRITE_FILE
	}) => class ReactRootRoute extends Route {
		/**
		 * Init properties.
		 * @param {Object} props - Props object
		 * @returns {undefined}
		 */
		[INIT_PROPS](props) {
			super[INIT_PROPS](props);
			this[REACT_ROOT_FILE] = undefined;
			this[REACT_HTML_FILE] = undefined;
		}

		/**
		 * Set this route as React root.
		 * @returns {undefined}
		 */
		async [INIT_ROUTE]() {
			// Define `[REACT_ROOT]` before calling superclass, so it's defined
			// before `plugin-react`'s `[INIT_ROUTE]()` method executes.
			this[REACT_ROOT] = this;

			// Delegate to super classes
			await super[INIT_ROUTE]();

			// Get / create root router file
			let rootFile = this[REACT_ROOT_FILE];
			if (!rootFile) {
				rootFile = this[GET_REACT_ROOT_FILE]();
				// Create empty root file if none exists
				if (!rootFile) rootFile = await this[WRITE_FILE](ROOT_EXT, '');

				this[REACT_ROOT_FILE] = rootFile;
			}

			// Get / create HTML file
			let htmlFile = this[REACT_HTML_FILE];
			if (!htmlFile) {
				htmlFile = this[GET_REACT_HTML_FILE]();
				// Create empty HTML file if none exists
				if (!htmlFile) htmlFile = await this[WRITE_FILE](HTML_EXT, '');

				this[REACT_HTML_FILE] = htmlFile;
			}
			if (!this[STATIC_FILE]) this[STATIC_FILE] = htmlFile;
		}

		/**
		 * Add React file to bundle.
		 * @returns {undefined}
		 */
		async [INIT_CHILDREN]() {
			// Delegate to super classes
			await super[INIT_CHILDREN]();

			// Create root file
			const rootFile = this[CREATE_REACT_ROOT_FILE](this[REACT_FILE]);

			// Pass to `@overlook/plugin-bundle` as entry file
			const bundleRoute = findParentOrSelf(this, route => route[BUNDLE_ADD_ENTRY]);
			assert(bundleRoute, 'React root or a route above it must use `@overlook/plugin-bundle`');
			bundleRoute[BUNDLE_ADD_ENTRY](rootFile, (bundlePath) => {
				// Create HTML file content
				this[CREATE_REACT_HTML_FILE](bundlePath);
			});
		}

		/**
		 * Create content of root file.
		 * @param {Object} routeFile - Route file
		 * @returns {Object} - Root file
		 */
		[CREATE_REACT_ROOT_FILE](routeFile) {
			const rootFile = this[REACT_ROOT_FILE];
			if (rootFile.content === '') rootFile.content = createRoot(routeFile, CONTAINER_ID);
			return rootFile;
		}

		/**
		 * Create content of HTML file.
		 * @param {string} bundlePath - File object for JS bundle
		 * @returns {Object} - HTML file
		 */
		[CREATE_REACT_HTML_FILE](bundlePath) {
			const htmlFile = this[REACT_HTML_FILE];
			if (htmlFile.content === '') htmlFile.content = createHtml(bundlePath, CONTAINER_ID);
			return htmlFile;
		}

		/**
		 * Get root file.
		 * Uses loaded file with ext `.root.jsx` if exists, otherwise returns undefined.
		 * @returns {Object|undefined} - Router file if found
		 */
		[GET_REACT_ROOT_FILE]() {
			const files = this[FILES];
			if (!files) return undefined;
			return files[ROOT_EXT];
		}

		/**
		 * Get HTML file.
		 * Uses loaded file with ext `.html` if exists, otherwise returns undefined.
		 * @returns {Object|undefined} - HTML file if found
		 */
		[GET_REACT_HTML_FILE]() {
			const files = this[FILES];
			if (!files) return undefined;
			return files[HTML_EXT];
		}

		/**
		 * If app is built, delete properties not needed at runtime.
		 * @returns {undefined}
		 */
		async [PRE_BUILD]() {
			if (super[PRE_BUILD]) await super[PRE_BUILD]();
			deleteRouteProperties(this, [
				// Properties
				REACT_ROOT_FILE, REACT_HTML_FILE,
				// Methods
				GET_REACT_ROOT_FILE, CREATE_REACT_ROOT_FILE, GET_REACT_HTML_FILE, CREATE_REACT_HTML_FILE
			]);
		}
	}
);

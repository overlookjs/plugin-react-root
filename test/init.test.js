/* --------------------
 * @overlook/plugin-react-root module
 * Init tests
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route'),
	// reactPlugin = require('@overlook/plugin-react'),
	{FILES} = require('@overlook/plugin-load'),
	bundlePlugin = require('@overlook/plugin-bundle'),
	reactRootPlugin = require('@overlook/plugin-react-root'),
	{
		REACT_ROOT_FILE, GET_REACT_ROOT_FILE, REACT_HTML_FILE, GET_REACT_HTML_FILE,
		REACT_ROOT, REACT_FILE, STATIC_FILE, File
	} = reactRootPlugin;

// Init
const {spy} = require('./support/index.js');

// Tests

const ReactRootRoute = Route.extend(reactRootPlugin).extend(bundlePlugin);

describe('Init', () => {
	describe('`[INIT_PROPS]()` defines undefined', () => {
		it.each([
			'REACT_ROOT_FILE',
			'REACT_HTML_FILE'
		])('%s', (propName) => {
			const route = new ReactRootRoute();

			const symbol = reactRootPlugin[propName];
			expect(typeof symbol).toBe('symbol');
			expect(route).toContainEntry([symbol, undefined]);
		});
	});

	it('sets `[REACT_ROOT]` as self', async () => {
		const root = new ReactRootRoute();
		root[REACT_FILE] = new File('/index.jsx');
		await root.init();
		expect(root[REACT_ROOT]).toBe(root);
	});

	describe('determines `[REACT_ROOT_FILE]`', () => {
		it(
			'from `[GET_REACT_ROOT_FILE]()` if `[REACT_ROOT_FILE]` undefined',
			async () => {
				const root = new ReactRootRoute();
				root[REACT_FILE] = new File('/index.jsx');
				const file = new File('/a/b/c');
				root[GET_REACT_ROOT_FILE] = () => file;
				await root.init();
				expect(root[REACT_ROOT_FILE]).toBe(file);
			}
		);

		it("from `[FILES]['root.jsx']` if `[REACT_ROOT_FILE]` undefined", async () => {
			const root = new ReactRootRoute();
			root[REACT_FILE] = new File('/index.jsx');
			const file = new File('/a/b/c');
			root[FILES] = {'root.jsx': file};
			await root.init();
			expect(root[REACT_ROOT_FILE]).toBe(file);
		});

		it(
			'does not call `[GET_REACT_ROOT_FILE]()` if `[REACT_ROOT_FILE]` defined',
			async () => {
				const root = new ReactRootRoute();
				root[REACT_FILE] = new File('/index.jsx');
				const file = new File('/a/b/c');
				root[REACT_ROOT_FILE] = file;
				root[GET_REACT_ROOT_FILE] = spy(() => {});
				await root.init();
				expect(root[REACT_ROOT_FILE]).toBe(file);
				expect(root[GET_REACT_ROOT_FILE]).not.toHaveBeenCalled();
			}
		);

		it(
			'creates file if `[REACT_ROOT_FILE]` undefined and `[GET_REACT_ROOT_FILE]()` returns undefined',
			async () => {
				const root = new ReactRootRoute();
				root[REACT_FILE] = new File('/index.jsx');
				await root.init();
				expect(root[REACT_ROOT_FILE]).toBeObject();
				expect(root[REACT_ROOT_FILE].path).toBe('?/anon.root.jsx');
			}
		);
	});

	describe('determines `[REACT_HTML_FILE]` + `[STATIC_FILE]`', () => {
		it(
			'from `[GET_REACT_HTML_FILE]()` if `[REACT_HTML_FILE]` undefined',
			async () => {
				const root = new ReactRootRoute();
				root[REACT_FILE] = new File('/index.jsx');
				const file = new File('/a/b/c');
				root[GET_REACT_HTML_FILE] = () => file;
				await root.init();
				expect(root[REACT_HTML_FILE]).toBe(file);
				expect(root[STATIC_FILE]).toBe(file);
			}
		);

		it('from `[FILES].html` if `[REACT_HTML_FILE]` undefined', async () => {
			const root = new ReactRootRoute();
			root[REACT_FILE] = new File('/index.jsx');
			const file = new File('/a/b/c');
			root[FILES] = {html: file};
			await root.init();
			expect(root[REACT_HTML_FILE]).toBe(file);
			expect(root[STATIC_FILE]).toBe(file);
		});

		it(
			'does not call `[GET_REACT_HTML_FILE]()` if `[REACT_HTML_FILE]` defined',
			async () => {
				const root = new ReactRootRoute();
				root[REACT_FILE] = new File('/index.jsx');
				const file = new File('/a/b/c');
				root[REACT_HTML_FILE] = file;
				root[GET_REACT_HTML_FILE] = spy(() => {});
				await root.init();
				expect(root[REACT_HTML_FILE]).toBe(file);
				expect(root[STATIC_FILE]).toBe(file);
				expect(root[GET_REACT_HTML_FILE]).not.toHaveBeenCalled();
			}
		);

		it(
			'creates file if `[REACT_HTML_FILE]` undefined and `[GET_REACT_HTML_FILE]()` returns undefined',
			async () => {
				const root = new ReactRootRoute();
				root[REACT_FILE] = new File('/index.jsx');
				await root.init();

				const file = root[REACT_HTML_FILE];
				expect(file).toBeObject();
				expect(file.path).toBe('?/anon.html');
				expect(root[STATIC_FILE]).toBe(file);
			}
		);
	});

	describe('creates files', () => {
		it('root JS file', async () => {
			const root = new ReactRootRoute();
			root[REACT_FILE] = new File('/index.jsx');
			await root.init();

			const file = root[REACT_ROOT_FILE];
			expect(file).toBeObject();
			expect(file.path).toBe('?/anon.root.jsx');
			expect(file.content.trim().split(/\n+/)).toEqual([
				expect.stringMatching(/^import React from "[^"]+";$/),
				expect.stringMatching(/^import \{render\} from "[^"]+";$/),
				'import Route from "/index.jsx";',
				'render(<Route />, document.getElementById("app"));'
			]);
		});

		it('HTML file', async () => { // eslint-disable-line jest/lowercase-name
			const root = new ReactRootRoute();
			root[REACT_FILE] = new File('/index.jsx');
			await root.init();

			const file = root[STATIC_FILE];
			expect(file).toBeObject();
			expect(file.path).toBe('?/anon.html');
			expect(file.content).toEqual(
				'<html>\n'
				+ '<body>\n'
				+ '<div id="app"></div>\n'
				+ '<script src="/static/bundle.js"></script>\n'
				+ '</body>\n'
				+ '</html>\n'
			);
		});
	});
});

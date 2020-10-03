/* --------------------
 * @overlook/plugin-react-root module
 * Create HTML file
 * ------------------*/

'use strict';

// Modules
const escapeHtml = require('escape-html');

// Exports

/**
 * Make HTML file content.
 * @param {string} path - Path for JS bundle
 * @param {string} containerId - ID of container element to render to
 * @returns {string} - HTML file content
 */
module.exports = function createHtml(path, containerId) {
	return '<html>\n'
		+ '<body>\n'
		+ `<div id="${escapeHtml(containerId)}"></div>\n`
		+ `<script src="${escapeHtml(path)}"></script>\n`
		+ '</body>\n'
		+ '</html>\n';
};

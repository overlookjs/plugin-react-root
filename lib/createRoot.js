/* --------------------
 * @overlook/plugin-react-root module
 * Create root file
 * ------------------*/

'use strict';

// Exports

const reactPath = require.resolve('@overlook/plugin-react/react'),
	reactDomPath = require.resolve('react-dom');

const {stringify} = JSON;

/**
 * Make router file content.
 * @param {Object} file - File object for router
 * @param {string} containerId - ID of container element to render to
 * @returns {string} - Router root file content
 */
module.exports = function createRoot(file, containerId) {
	return `import React from ${stringify(reactPath)};\n`
		+ `import {render} from ${stringify(reactDomPath)};\n\n`
		+ `import Route from ${stringify(file.path)};\n\n`
		+ `render(<Route />, document.getElementById(${stringify(containerId)}));\n`;
};

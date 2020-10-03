/* --------------------
 * @overlook/plugin-react-root module
 * ESM entry point
 * Re-export CJS with named exports
 * ------------------*/

// Exports

import reactRootPlugin from '../lib/index.js';

export default reactRootPlugin;
export const {
	REACT_ROOT_FILE,
	GET_REACT_ROOT_FILE,
	CREATE_REACT_ROOT_FILE,
	REACT_HTML_FILE,
	GET_REACT_HTML_FILE,
	CREATE_REACT_HTML_FILE
} = reactRootPlugin;

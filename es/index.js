/* --------------------
 * @overlook/plugin-react-root module
 * ESM entry point
 * Re-export CJS with named exports
 * ------------------*/

// Exports

import reactRootPlugin from '../lib/index.js';

export default reactRootPlugin;
export const {
	GET_REACT_ROOT_FILE
} = reactRootPlugin;

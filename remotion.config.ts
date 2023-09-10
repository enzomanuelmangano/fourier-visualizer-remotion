/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */
import {enableSkia} from '@remotion/skia/enable';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig((config) => {
	return enableSkia(config);
});

// Usually I use this value to set the number of threads to use
// Node -e "const os = require('os'); console.log(os.cpus().length);"
// In this specific case, I'm using 1, because with 2 or more threads
// the result was messed up :/
Config.setConcurrency(1);
Config.setChromiumOpenGlRenderer('angle');

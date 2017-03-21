'use strict';

/**
 * @readme-quick-run
 *
 * ## test tar=js r_c=readmeBuilder
 * let path = require('path');
 *
 * readmeBuilder({
 *     projectDir: path.resolve(__dirname, './test/fixture/node/p0')
 * }).then((ret) => {
 *     console.log(ret.en.slice(0, 200) + '\n\n......\n\n\n'); // en version
 *     console.log(ret.zh.slice(0, 200) + '\n\n......\n\n'); // zh version
 * });
 */

module.exports = require('./src');

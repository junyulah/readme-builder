'use strict';

let node = require('./node');

let docMap = {
    node
};

/**
 * @readme-quick-run
 *
 * ## test tar=js r_c=readmeBuilder
 * let path = require('path');
 *
 * readmeBuilder({
 *     projectDir: path.resolve(__dirname, '../test/fixture/node/p0')
 * }).then((ret) => {
 *     console.log(ret.en.slice(0, 500) + '\n......'); // en version
 *     console.log(ret.zh.slice(0, 500) + '\n......'); // zh version
 * });
 */

module.exports = (opts, type = 'node') => {
    return docMap[type](opts);
};

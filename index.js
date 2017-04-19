'use strict';

/**
 * @readme-quick-run
 *
 * quickest way to use readme builder api, just specify project directory
 * [readme-lang:zh] 最快使用readme builder api的方法，指定好目标项目的路径即可
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

/**
 * TODO
 *
 * 1. features description plugin
 *
 */
module.exports = require('./src');

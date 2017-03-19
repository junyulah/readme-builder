'use strict';

let fs = require('fs');
let path = require('path');

let tpl = require('./tpl');

let promisify = require('es6-promisify');

let collect = require('./collector');

let process = require('./processor');

let readFile = promisify(fs.readFile);

/**
 * get readme doc options from package.json
 *
 * step1: collect information from project root directory
 *
 * step2: render doc according to tpl and information
 *
 * TODO dev helper
 *   show files toc and simple description
 */

module.exports = ({
    projectDir,
}) => {
    return getPackageJson(projectDir).then((packageJson) => {
        let {
            docTpl
        } = packageJson.readmeDocOptions || {};

        if (docTpl) {
            tpl = require(path.resolve(projectDir, docTpl));
        }

        return collect(projectDir, packageJson).then((infos) => process(projectDir, packageJson, infos)).then(tpl);
    });
};

let getPackageJson = (projectDir) => {
    let packageJsonFile = path.resolve(projectDir, './package.json');
    return readFile(packageJsonFile, 'utf-8').then((str) => {
        return JSON.parse(str);
    });
};

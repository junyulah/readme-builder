'use strict';

let fs = require('fs');
let path = require('path');
let promisify = require('es6-promisify');
let readFile = promisify(fs.readFile);
let stat = promisify(fs.stat);

module.exports = (projectDir, packageJson) => {
    let licenseFile = path.resolve(projectDir, './LICENSE');
    return stat(licenseFile).then((stats) => {
        if (stats.isFile()) {
            return readFile(licenseFile, 'utf-8');
        }
    }).catch(() => {
        return null;
    }).then(ret => ret || packageJson.license);
};

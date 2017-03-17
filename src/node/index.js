'use strict';

let fs = require('fs');
let path = require('path');
let glob = require('glob');

let tpl = require('./tpl');

let promisify = require('es6-promisify');

let {
    parseComment
} = require('defcomment');

let commentToDocVariables = require('./commentToDocVariables');

let binHelpDoc = require('./binHelpDoc');

let devHelpDoc = require('./devHelpDoc');

let readFile = promisify(fs.readFile);
let stat = promisify(fs.stat);

/**
 * step1: collect information from project root directory
 *
 * step2: render doc according to tpl and information
 *
 * TODO dev helper
 *   show files toc and simple description
 */

module.exports = ({
    projectDir,
    docTpl,
    pattern
}) => {
    tpl = docTpl || tpl;
    return collect(projectDir, pattern).then(tpl);
};

let collect = (projectDir, pattern) => {
    return Promise.all([
        getPackageJson(projectDir),
        getLicense(projectDir),
        getComments(projectDir, pattern),
        binHelpDoc(projectDir),
        devHelpDoc(projectDir)
    ]).then(([packageJson, license, comments, binHelpers, devHelpers]) => {
        return {
            packageJson,
            license,
            binHelpers,
            devHelpers,
            comments: commentToDocVariables(comments)
        };
    });
};

let getPackageJson = (projectDir) => {
    let packageJsonFile = path.resolve(projectDir, './package.json');
    return readFile(packageJsonFile, 'utf-8').then((str) => {
        return JSON.parse(str);
    });
};

let getLicense = (projectDir) => {
    let licenseFile = path.resolve(projectDir, './LICENSE');
    return stat(licenseFile).then((stats) => {
        if (stats.isFile()) {
            return readFile(licenseFile, 'utf-8');
        }
    }).catch(() => {
        return null;
    });
};

let getComments = (projectDir, pattern = '!(node_modules)**/*.js') => {
    return new Promise((resolve, reject) => {
        glob(pattern, {
            cwd: projectDir
        }, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(Promise.all(files.map((file) => {
                    let filePath = path.join(projectDir, file);
                    return readFile(filePath, 'utf-8').then(parseComment).then((comment) => {
                        return {
                            file,
                            comment
                        };
                    });
                })));
            }
        });
    });
};

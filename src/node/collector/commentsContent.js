'use strict';

let fs = require('fs');
let path = require('path');
let promisify = require('es6-promisify');
let glob = require('glob');
let readFile = promisify(fs.readFile);
let {
    parseComment
} = require('defcomment');

module.exports = (projectDir, packageJson) => {
    let {
        pattern = '**/*', ignores = ['**/*/node_modules/**/*', 'node_modules/**/*']
    } = packageJson.readmeDocOptions || {};

    return new Promise((resolve, reject) => {
        glob(pattern, {
            cwd: projectDir,
            nodir: true,
            ignore: ignores
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

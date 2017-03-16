'use strict';

let fs = require('fs');
let path = require('path');
let promisify = require('es6-promisify');
let {
    exec
} = require('child_process');
let readFile = promisify(fs.readFile);

module.exports = (projectDir) => {
    return getPackageJson(projectDir).then((packageJson) => {
        let bin = packageJson.bin;
        let infos = [];
        for (let name in bin) {
            // TODO get help from bin
            infos.push(getHelpInfo(name, projectDir, bin[name]));
        }

        return Promise.all(infos);
    }).then((infos) => {
        return infos.filter((info) => !!info);
    });
};

let getHelpInfo = (name, projectDir, relativePath) => {
    let filePath = path.resolve(projectDir, relativePath);

    return new Promise((resolve) => {
        exec(`${filePath} -h`, (err, stdout) => {
            if (err) {
                resolve(null);
            } else {
                resolve({
                    name,
                    text: stdout
                });
            }
        });
    });
};

let getPackageJson = (projectDir) => {
    let packageJsonFile = path.resolve(projectDir, './package.json');
    return readFile(packageJsonFile, 'utf-8').then((str) => {
        return JSON.parse(str);
    });
};

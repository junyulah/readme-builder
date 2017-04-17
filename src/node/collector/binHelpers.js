'use strict';

/**
 * @readme-file-description collect bin help info
 */

let path = require('path');
let {
    exec
} = require('child_process');

module.exports = (projectDir, packageJson) => {
    let bin = packageJson.bin;
    let infos = [];
    for (let name in bin) {
        // TODO get help from bin
        infos.push(getHelpInfo(name, projectDir, bin[name]));
    }

    return Promise.all(infos).then((infos) => {
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

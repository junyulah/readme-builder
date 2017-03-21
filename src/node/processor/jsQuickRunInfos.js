'use strict';

let path = require('path');
let {
    getTestInfoByRunIt, testFailInformation
} = require('../../util');

/**
 * generate bin tool example
 */
module.exports = (projectDir, packageJson, {
    comments
}) => {
    let bins = packageJson.bin || {};
    let binKeys = Object.keys(bins);

    let quickRunDocs = comments.quickRunDocs || [];

    return Promise.all(
        quickRunDocs.filter(({
            file
        }) => {
            let filePath = path.resolve(projectDir, file);
            return binKeys.findIndex((binKey) => {
                let binPath = path.resolve(projectDir, bins[binKey]);
                return binPath === filePath;
            }) === -1;
        }).map((quickRunDoc) => {
            return runQuickStart(quickRunDoc, projectDir, packageJson);
        })
    ).then((list = []) => {
        return list.reduce((prev, cur) => prev.concat(cur), []);
    });
};

let runQuickStart = ({
    test,
    file,
    testDescription
}, projectDir, packageJson) => {
    let filePath = path.resolve(projectDir, file);

    return getTestInfoByRunIt(test, filePath).then((ret) => {
        return ret.cases.map(({
            sampleString, errorMsg, testVariables
        }) => {
            let code = sampleString;
            let modulePath = file === packageJson.main ? packageJson.name : `'${packageJson.name}/${file}'`;
            code = `let ${getModuleVarName(file, testVariables)} = require('${modulePath}')\n${code}`;

            if (errorMsg) {
                throw new Error(`fail to run API quick start. ${testFailInformation(sampleString, errorMsg)}`);
            } else {
                return {
                    code,
                    file,
                    filePath,
                    testDescription,
                    stdouts: ret.stdouts.join(''),
                };
            }
        });
    });
};

let getModuleVarName = (file, testVariables) => {
    if (testVariables.r_c) return testVariables.r_c;
    return path.basename(file, path.extname(file));
};

'use strict';

let path = require('path');

let {
    map
} = require('bolzano');
let {
    getTestInfoByRunIt, testFailInformation, getModuleVarName, getModulePath, hideLine
} = require('../../util');

/**
 * generate api doc infos
 */
module.exports = (projectDir, packageJson, {
    comments
}) => {
    return Promise.all(map(comments.apis, ({
        test, testDescription, file
    }) => {
        let jsPath = path.resolve(projectDir, file);
        return runApiRefer(test, jsPath, file, packageJson).then(({
            code, apiDes
        }) => {
            return {
                testDescription,
                code,
                apiDes
            };
        });
    }));
};

let runApiRefer = (test, jsPath, file, packageJson) => {
    return getTestInfoByRunIt(test, jsPath).then((rets) => {
        let codes = rets.cases.map(({
            sampleString, errorMsg, testVariables
        }) => {
            if (errorMsg) {
                throw new Error(`fail to run CLI quick start. ${testFailInformation(sampleString, errorMsg)}`);
            } else {
                let modulePath = getModulePath(packageJson, file);
                return `let ${getModuleVarName(file, testVariables)} = require('${modulePath}')\n${sampleString}`;
            }
        });

        return {
            code: hideLine(codes.join('\n')),
            apiDes: JSON.parse(rets.stdouts.join('\n'))
        };
    });
};

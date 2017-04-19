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
            code, apiDes, testVariables
        }) => {
            return {
                testDescription,
                code,
                apiDes,
                testVariables
            };
        });
    }));
};

let runApiRefer = (test, jsPath, file, packageJson) => {
    return getTestInfoByRunIt(test, jsPath).then((rets) => {
        let testVars = null;

        let codes = rets.cases.map(({
            sampleString, errorMsg, testVariables
        }) => {
            if (!testVars) {
                testVars = testVariables;
            }
            if (errorMsg) {
                throw new Error(`fail to run CLI quick start. ${testFailInformation(sampleString, errorMsg)}`);
            } else {
                let modulePath = getModulePath(packageJson, file);
                return `let ${getModuleVarName(file, testVariables)} = require('${modulePath}')\n${sampleString}`;
            }
        });

        let apiDes = null;
        if (testVars && testVars.api_des === 'output') {
            apiDes = JSON.parse(rets.stdouts.join('\n'));
        }

        return {
            code: hideLine(codes.join('\n')),
            apiDes,
            testVariables: testVars
        };
    });
};

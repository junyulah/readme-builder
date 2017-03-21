'use strict';

let uuidV4 = require('uuid/v4');
let del = require('del');
let path = require('path');
let {
    runTestsWithParsedCode
} = require('defcomment');

let getTestInfoByRunIt = ({
    resultCode, testCode
}, srcPath) => {
    let testFile = path.join(path.dirname(srcPath), `${uuidV4()}.js`);
    let destFile = path.join(path.dirname(srcPath), `${uuidV4()}.js`);

    return runTestsWithParsedCode(resultCode, testCode, destFile, testFile, {
        silent: true
    }).then((rets) => {
        return del([testFile, destFile], {
            force: true
        }).then(() => rets);
    }).catch((err) => {
        return del([testFile, destFile], {
            force: true
        }).then(() => {
            throw err;
        });
    });
};

let testFailInformation = (sampleString, errorMsg) => {
    return `code is : \n\n${sampleString.split('\n').map((line) => `    ${line}`).join('\n')}.\n\nError information is : ${errorMsg}`;
};

module.exports = {
    getTestInfoByRunIt,
    testFailInformation
};

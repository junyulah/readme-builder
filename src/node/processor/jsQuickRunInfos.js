'use strict';

let path = require('path');
let {
    getTestInfoByRunIt
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
            return runQuickStart(quickRunDoc, projectDir);
        })
    ).then((list = []) => {
        return list.reduce((prev, cur) => prev.concat(cur), []);
    });
};

let runQuickStart = ({
    test,
    file,
    testDescription
}, projectDir) => {
    let filePath = path.resolve(projectDir, file);

    return getTestInfoByRunIt(test, filePath).then((ret) => {
        return ret.cases.map(({
            sampleString, errorMsg
        }) => {
            if (errorMsg) {
                return {
                    code: sampleString,
                    errorMsg,
                    file,
                    filePath,
                    testDescription
                };
            } else {
                return {
                    code: sampleString,
                    stdouts: ret.stdouts.join(''),
                    file,
                    filePath,
                    testDescription
                };
            }
        });
    });
};

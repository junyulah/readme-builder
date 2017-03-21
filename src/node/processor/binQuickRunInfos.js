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

    return Promise.all(Object.keys(bins).map((name) => {
        let binPath = path.resolve(projectDir, bins[name]);

        let quickRuns = filterBinQuickRuns(comments.quickRunDocs || [], projectDir, binPath);

        return Promise.all(quickRuns.map((quick) => runBinQuickRun(quick, binPath).then((testInfos) => {
            return {
                testDescription: quick.testDescription,
                testInfos,
                binRelativePath: bins[name]
            };
        }))).then((quickRunInfos) => {
            return {
                binName: name,
                binPath,
                quickRunInfos
            };
        });
    }));
};

let runBinQuickRun = ({
    test
}, binPath) => {
    return getTestInfoByRunIt(test, binPath).then((rets) => {
        return rets.cases.map(({
            sampleString, errorMsg, result
        }) => {
            if (errorMsg) {
                return {
                    binCode: sampleString,
                    errorMsg
                };
            } else {
                return {
                    binCode: sampleString,
                    stdouts: result.stdouts,
                    stderrs: result.stderrs
                };
            }
        });
    });
};

let filterBinQuickRuns = (comments, basedir, target) => {
    return comments.filter(({
        file
    }) => {
        return path.resolve(basedir, file) === target;
    });
};

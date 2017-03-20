'use strict';

let path = require('path');
let uuidV4 = require('uuid/v4');
let del = require('del');

let {
    runTestsWithParsedCode
} = require('defcomment');

/**
 * generate bin tool example
 */
module.exports = (projectDir, packageJson, {
    comments
}) => {
    let bins = packageJson.bin;

    return Promise.all(Object.keys(bins).map((name) => {
        let binPath = path.resolve(projectDir, bins[name]);

        let quickRuns = filterBinQuickRuns(comments.quickRunDocs || [], projectDir, binPath);

        return Promise.all(quickRuns.map((quick) => runBinQuickRun(quick, binPath).then((testInfos) => {
            return {
                binName: name,
                binPath,
                binRelativePath: bins[name],
                testInfos,
                testDescription: quick.testDescription
            };
        }))).then((quickRunInfos) => {
            return quickRunInfos;
        });
    })).then((list) => {
        return list.map((
            quickRunInfos
        ) => quickRunInfos);
    });
};

let runBinQuickRun = ({
    test
}, binPath) => {
    let testFile = path.join(path.dirname(binPath), `${uuidV4()}.js`);
    let destFile = path.join(path.dirname(binPath), `${uuidV4()}.js`);

    return runTestsWithParsedCode(test.resultCode, test.testCode, destFile, testFile, {
        silent: true
    }).then((rets) => {
        return del([testFile, destFile], {
            force: true
        }).then(() => {
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
    }).catch(() => {
        return del([testFile, destFile], {
            force: true
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

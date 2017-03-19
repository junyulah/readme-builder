'use strict';

let commentToDocVariables = require('./commentToDocVariables');
let binExampleDoc = require('./binExampleDoc');

module.exports = (projectDir, packageJson, infos) => {
    let comments = commentToDocVariables(infos.commentsContent, {
        projectDir
    });

    return binExampleDoc({
        projectDir,
        comments,
        packageJson
    }).then((binExamples) => {
        return Object.assign(infos, {
            packageJson,
            projectDir,
            comments,
            binQuickRunInfos: binExamples.map(({
                quickRunInfos
            }) => quickRunInfos)
        });
    });
};

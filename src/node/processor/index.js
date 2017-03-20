'use strict';

let commentToDocVariables = require('./commentToDocVariables');
let binQuickRunInfos = require('./binQuickRunInfos');

module.exports = (projectDir, packageJson, infos) => {
    let comments = commentToDocVariables(infos.commentsContent, {
        projectDir
    });

    infos.comments = comments;

    return binQuickRunInfos(projectDir, packageJson, infos).then((binQuickRunInfos) => {
        return Object.assign(infos, {
            packageJson,
            projectDir,
            comments,
            binQuickRunInfos
        });
    });
};

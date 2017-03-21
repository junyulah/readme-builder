'use strict';

let commentToDocVariables = require('./commentToDocVariables');
let binQuickRunInfos = require('./binQuickRunInfos');
let jsQuickRunInfos = require('./jsQuickRunInfos');

let processors = {
    binQuickRunInfos, jsQuickRunInfos
};

let processorKeys = Object.keys(processors);

module.exports = (projectDir, packageJson, infos) => {
    let comments = commentToDocVariables(infos.commentsContent, {
        projectDir
    });

    infos.comments = comments;

    infos.packageJson = packageJson;
    infos.projectDir = projectDir;

    return Promise.all(processorKeys.map((processorName) => {
        return processors[processorName](projectDir, packageJson, infos);
    })).then((list) => {
        return Object.assign(infos, list.reduce((prev, item, index) => {
            prev[processorKeys[index]] = item;
            return prev;
        }, {}));
    });
};

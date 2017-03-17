'use strict';

let {
    filesTree
} = require('./filesToc');

module.exports = (projectDir, opts) => {
    return filesTree(projectDir, opts).then((tree) => {
        return {
            filesTree: tree
        };
    });
};

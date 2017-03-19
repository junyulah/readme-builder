'use strict';

let {
    filesTree
} = require('../filesToc');

module.exports = (projectDir) => {
    return filesTree(projectDir).then((tree) => {
        return {
            filesTree: tree
        };
    });
};

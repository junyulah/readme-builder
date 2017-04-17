'use strict';

let {
    filesTree
} = require('dir-tree-info');

module.exports = (projectDir) => {
    return filesTree(projectDir).then((tree) => {
        return {
            filesTree: tree
        };
    });
};

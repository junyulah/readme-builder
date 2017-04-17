'use strict';

let {
    filesTree
} = require('dir-tree-info');

/**
 * collect dev infos from project
 *
 * TODO file or directory description info
 */
module.exports = (projectDir) => {
    return filesTree(projectDir).then((tree) => {
        return {
            filesTree: tree
        };
    });
};

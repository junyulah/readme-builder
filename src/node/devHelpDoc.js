'use strict';

let fs = require('fs');
let path = require('path');
let promisify = require('es6-promisify');
let minimatch = require('minimatch');
let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);

module.exports = (projectDir, opts) => {
    return filesTree(projectDir, opts).then((tree) => {
        return {
            filesTree: tree
        };
    });
};

/**
 * get project toc
 *
 * @return
 * {
 *      files: [],
 *      name,
 *      type,
 *      path
 * }
 */
let filesTree = (dir, depth = 0, name = '.', opts = {}) => {
    let {
        maxDepth = 5, ignores = ['node_modules', '.git', '*.DS_Store', '*.swp', '*.swn', '.*']
    } = opts;

    if (depth > maxDepth) return null;

    return readdir(dir).then((files) => {
        return Promise.all(files.filter((file) => {
            return ignores.findIndex((ignore) => minimatch(file, ignore)) === -1;
        }).map((file) => {
            let filepath = path.join(dir, file);
            return stat(filepath).then((stats) => {
                if (stats.isDirectory()) {
                    let nextDepth = ++depth;
                    return filesTree(filepath, nextDepth, file, opts);
                } else if (stats.isFile()) {
                    return {
                        name: file,
                        path: filepath,
                        type: 'file'
                    };
                }
            });
        })).then((nexts) => {
            return {
                files: nexts.filter((file) => !!file),
                name,
                type: 'directory',
                path: dir
            };
        });
    });
};

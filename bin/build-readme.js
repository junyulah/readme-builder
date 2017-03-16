#!/usr/bin/env node

'use strict';

let fs = require('fs');
let promisify = require('es6-promisify');
let path = require('path');

let writeFile = promisify(fs.writeFile);

let docBuilder = require('..');

let yargs = require('yargs');

yargs.usage(`Usage: buildreadme
    -p [project directory, default is current directory]
    -t [project type, default is node]
    -w [write to readme.md]
    `).help('h').alias('h', 'help');

let {
    argv
} = yargs;

let projectDir = path.resolve(argv.p || process.cwd());

docBuilder({
    projectDir
}, argv.t).then((readmeMap) => {
    if (argv.w) {
        return Promise.all(
            Object.keys(readmeMap).map((type) => {
                let readmePath = type === 'en' ? path.resolve(projectDir, 'README.md') : path.resolve(projectDir, `README_${type}.md`);
                return writeFile(readmePath, readmeMap[type], 'utf-8');
            })
        );
    } else {
        console.log(readmeStr); // eslint-disable-line
    }
});

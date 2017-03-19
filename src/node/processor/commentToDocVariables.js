'use strict';

const RAW_READ_ME_DOC_PREFIX = '@readme-doc';
const READ_ME_QUICK_RUN_PREFIX = '@readme-quick-run';

let {
    testParser
} = require('defcomment');

let path = require('path');

module.exports = (comments = [], {
    projectDir,
    rawReadMeDocPrefix = RAW_READ_ME_DOC_PREFIX, readMeQuickRunPrefix = READ_ME_QUICK_RUN_PREFIX
} = {}) => {
    return comments.reduce((prev, {
        file, comment
    }) => {
        return comment.reduce((pre, {
            paraBlocks
        }) => {
            let lines = joinLines(paraBlocks);
            let firstIndex = getFirstTextLineIndex(lines);
            if (firstIndex !== -1) {
                let rawReadDoc = getPara(rawReadMeDocPrefix, lines, firstIndex, file);
                if (rawReadDoc) {
                    pre.rawReadDocs = pre.rawReadDocs || [];
                    pre.rawReadDocs.push(rawReadDoc);
                } else {
                    let quickRunDoc = getPara(readMeQuickRunPrefix, lines, firstIndex, file);

                    if (quickRunDoc) {
                        quickRunDoc.test = testParser(comment, path.resolve(projectDir, file));
                        pre.quickRunDocs = pre.quickRunDocs || [];
                        pre.quickRunDocs.push(quickRunDoc);
                    }
                }
            }

            return pre;
        }, prev);
    }, {});
};

let getPara = (prefix, lines, firstIndex, file) => {
    if (lines[firstIndex] === prefix) {
        return {
            file,
            PREFIX: lines[firstIndex], text: lines.slice(firstIndex + 1).join('\n').trim()
        };
    }
};

let joinLines = (paraBlocks) => {
    let lines = paraBlocks.reduce((prev, block) => {
        return prev.concat(block);
    }, []);

    return lines;
};

let getFirstTextLineIndex = (lines) => {
    return lines.findIndex((line) => {
        return !!line.trim();
    });
};

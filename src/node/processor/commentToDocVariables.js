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
        return comment.reduce((pre, block) => {
            let {
                paraBlocks
            } = block;
            let lines = joinLines(paraBlocks);
            let firstIndex = getFirstTextLineIndex(lines);
            if (firstIndex !== -1) {
                let rawReadDoc = getPara(rawReadMeDocPrefix, lines, firstIndex, file);
                if (rawReadDoc) {
                    pre.rawReadDocs = pre.rawReadDocs || [];
                    pre.rawReadDocs.push(rawReadDoc);
                } else {
                    let quickRunDoc = getQuickRunDoc(lines, firstIndex, readMeQuickRunPrefix, file, projectDir, block);

                    if (quickRunDoc) {
                        pre.quickRunDocs = pre.quickRunDocs || [];
                        pre.quickRunDocs.push(quickRunDoc);
                    }
                }
            }

            return pre;
        }, prev);
    }, {});
};

let getQuickRunDoc = (lines, firstIndex, readMeQuickRunPrefix, file, projectDir, block) => {
    let quickRunDoc = getPara(readMeQuickRunPrefix, lines, firstIndex, file);

    if (quickRunDoc) {
        quickRunDoc.test = testParser([block], path.resolve(projectDir, file));
        quickRunDoc.testDescription = getTestDescription(quickRunDoc.text);

        return quickRunDoc;
    }
};

let getTestDescription = (text) => {
    let parts = text.split(/#+\s*test/);
    if (parts.length < 2) {
        return '';
    }
    return parts[0].trim();
};

let getPara = (prefix, lines, firstIndex, file) => {
    if (lines[firstIndex] === prefix) {
        return {
            PREFIX: lines[firstIndex],
            file,
            text: lines.slice(firstIndex + 1).join('\n').trim()
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

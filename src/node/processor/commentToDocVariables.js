'use strict';

const RAW_READ_ME_DOC_PREFIX = '@readme-doc';
const READ_ME_QUICK_RUN_PREFIX = '@readme-quick-run';
const READ_ME_FILE_DESCRIPTION_PREFIX = '@readme-file-description';

let {
    testParser
} = require('defcomment');

let path = require('path');

module.exports = (comments = [], {
    projectDir,
    rawReadMeDocPrefix = RAW_READ_ME_DOC_PREFIX, readMeQuickRunPrefix = READ_ME_QUICK_RUN_PREFIX, readMeFileDescriptionPrefix = READ_ME_FILE_DESCRIPTION_PREFIX
} = {}) => {
    let prefixMap = {
        rawReadDocs: rawReadMeDocPrefix,
        quickRunDocs: readMeQuickRunPrefix,
        fileDescriptions: readMeFileDescriptionPrefix
    };

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
                for (let name in prefixMap) {
                    let prefix = prefixMap[name];
                    let item = getPara(prefix, lines, firstIndex, file);
                    if (item) {
                        if (prefix === readMeQuickRunPrefix) {
                            item.test = testParser([block], path.resolve(projectDir, file));
                            item.testDescription = getTestDescription(item.text);
                        }
                        pre[name] = pre[name] || [];
                        pre[name].push(item);
                        break;
                    }
                }
            }
            return pre;
        }, prev);
    }, {});
};

let getTestDescription = (text) => {
    let parts = text.split(/#+\s*test/);
    if (parts.length < 2) {
        return '';
    }
    return parts[0].trim();
};

let getPara = (prefix, lines, firstIndex, file) => {
    let firstLine = lines[firstIndex].trim();
    if (firstLine.indexOf(prefix) === 0 &&
        (firstLine.length === prefix.length || /\s/.test(firstLine[prefix.length]))
    ) {
        let firstLineParamText = (firstLine.substring(prefix.length) || '').trim();

        return {
            PREFIX: firstLine,
            firstLineParamText,
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

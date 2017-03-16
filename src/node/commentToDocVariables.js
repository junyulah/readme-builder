'use strict';

const RAW_READ_ME_DOC_prefix = '@readme-doc';

module.exports = (comments = [], {
    rawReadMeDocPrefix = RAW_READ_ME_DOC_prefix
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
                if (lines[firstIndex] === rawReadMeDocPrefix) {
                    pre.rawReadDocs = pre.rawReadDocs || [];
                    pre.rawReadDocs.push({
                        prefix: lines[firstIndex],
                        text: lines.slice(firstIndex + 1).join('\n').trim()
                    });
                }
            }
            return pre;
        }, prev);
    }, {});
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

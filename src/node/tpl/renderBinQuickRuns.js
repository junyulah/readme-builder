'use strict';

let renderStdouts = require('./renderStdouts');
let {processRawText} = require('../../util');

module.exports = (binQuickRunInfos, lang, langType) => {
    return `
${binQuickRunInfos.length? `### ${lang('CLI quick run')}`: ''}

${binQuickRunInfos.map(({quickRunInfos, binName}) => {
    return `- ${binName}` + '\n\n' + quickRunInfos.map(({testInfos, testDescription}) => {
        // simple description about this quick run demo
        return `${processRawText(testDescription, langType)}

${testInfos.map(({binCode, stdouts}) => {
    binCode = processRawText(binCode);
    return `
\`\`\`shell
${lang('commands')}

${binCode.split('\n').reduce((prev, line) => {
    if(line && line.trim()) {
        prev.push(`    $  ${line}`);
    }
    return prev;
}, []).join('\n')}
\`\`\`

${renderStdouts(stdouts, lang)}
`;
}).join('\n\n')}
`;
    }).join('\n');
})}`;
};

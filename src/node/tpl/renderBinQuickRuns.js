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
    return `
\`\`\`shell
${lang('commands')}

${binCode.split('\n').map(line => `    $  ${line}`).join('\n')}
\`\`\`

${renderStdouts(stdouts, lang)}
`;
}).join('\n\n')}
`;
    }).join('\n');
})}`;
};

'use strict';

let renderStdouts = require('./renderStdouts');

module.exports = (binQuickRunInfos, lang) => {
    return `
${binQuickRunInfos.length? `### ${lang('CLI quick run')}`: ''}

${binQuickRunInfos.map(({quickRunInfos, binName}) => {
    return `- ${binName}` + '\n\n' + quickRunInfos.map(({testInfos, testDescription}) => {
        return `${testDescription}

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

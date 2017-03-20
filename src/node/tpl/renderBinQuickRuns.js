'use strict';

module.exports = (binQuickRunInfos, lang) => {
    return `
${binQuickRunInfos.length? `### ${lang('quick run CLI')}`: ''}

${binQuickRunInfos.map(({quickRunInfos, binName}) => {
    return `- ${binName}` + '\n\n' + quickRunInfos.map(({testInfos, testDescription}) => {
        return `${testDescription}

${testInfos.map(({binCode, stdouts}) => {
    return `
\`\`\`shell
${lang('commands')}

${binCode.split('\n').map(line => `    $  ${line}`).join('\n')}
\`\`\`

${stdouts && stdouts.trim()? `<pre>
${lang('output')}

${stdouts.trim().split('\n').map((line) => `    ${line}`).join('\n')}

</pre>`: ''}
`;
}).join('\n\n')}
`;
    }).join('\n');
})}`;
};


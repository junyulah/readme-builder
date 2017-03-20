'use strict';

module.exports = (binQuickRunInfos, lang) => {
    return `
${binQuickRunInfos.length? `### ${lang('bin quick run')}`: ''}

${binQuickRunInfos.map((infos) => {
    return infos.map(({binName, testInfos, testDescription}) => {
        return `- ${binName}

${testDescription}

${testInfos.map(({binCode, stdouts}) => {
    return `
\`\`\`shell
${lang('commands')}

${binCode.split('\n').map(line => `$  ${line}`).join('\n')}
\`\`\`

${stdouts && stdouts.trim()? `<pre>
\`\`\`
${lang('output')}

${stdouts}

\`\`\`
</pre>`: ''}
`;
})}
`;
    }).join('\n');
})}`;
};


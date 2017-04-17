'use strict';

module.exports = (stdouts, lang) => {
    return stdouts && stdouts.trim()? `\`\`\`
${lang('output')}

${stdouts.trim().split('\n').map((line) => `    ${line}`).join('\n')}

\`\`\``: '';
};

'use strict';

let renderStdouts = require('./renderStdouts');

module.exports = (jsQuickRunInfos, lang) => {
    return `
${jsQuickRunInfos.length? `### ${lang('API quick run')}`: ''}

${jsQuickRunInfos.map(({code, stdouts, testDescription}) => {
    return `${testDescription || ''}

\`\`\`js
${code}
\`\`\`

${renderStdouts(stdouts, lang)}`;
}).join('\n')
}`;
};


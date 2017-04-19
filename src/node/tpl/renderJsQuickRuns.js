'use strict';

let renderStdouts = require('./renderStdouts');
let {processRawText} = require('../../util');

module.exports = (jsQuickRunInfos, lang, langType) => {
    return `
${jsQuickRunInfos.length? `### ${lang('API quick run')}`: ''}

${jsQuickRunInfos.map(({code, stdouts, testDescription}) => {
    // simple description for this demo
    return `${processRawText(testDescription || '', langType)}

\`\`\`js
${code}
\`\`\`

${renderStdouts(stdouts, lang)}`;
}).join('\n\n')
}`;
};


'use strict';

let {
    getFilesToc
} = require('dir-tree-info');

module.exports = ({devHelpers, packageJson}, lang) => {
    let testText = getTestText(packageJson);
    return `## ${lang('develop')}

### ${lang('file structure')}

\`\`\`
${getFilesToc(devHelpers.filesTree)} 
\`\`\`

${testText? `
### ${lang('run tests')}

\`npm test\`
`: ''}`;
};

let getTestText = (packageJson) => {
    let scripts = packageJson.scripts || {};
    let test = scripts.test;
    if(test === 'echo \"Error: no test specified\" && exit 1') return '';
    return test;
};

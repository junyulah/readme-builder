'use strict';

module.exports = ({
    packageJson,
    license,
    comments = {}
}) => {

    return `# ${packageJson.name}

## install

\`npm i ${packageJson.name} --save\` or \`npm i ${packageJson.name} --save-dev\`

Install on global, using \`npm i ${packageJson.name} -g\`

${comments.rawReadDocs? comments.rawReadDocs.map(({text}) => text).join('\n') : ''}

${license?`## license

${license}` : ''}`;
};

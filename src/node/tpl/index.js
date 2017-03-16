'use strict';

module.exports = ({
    packageJson,
    license,
    comments = {},
    binHelpers = []
}) => {

    return `# ${packageJson.name}

## install

\`npm i ${packageJson.name} --save\` or \`npm i ${packageJson.name} --save-dev\`

Install on global, using \`npm i ${packageJson.name} -g\`

${comments.rawReadDocs? comments.rawReadDocs.map(({text}) => text).join('\n') : ''}

${binHelpers.length? '## BIN USAGE\n': ''}
${binHelpers.map(({name, text}) => {
    return `\`\`\`
$ ./node_modules/${packageJson.name}/bin/${name} -h

${text}
\`\`\`
`;
})}

${license?`## license

${license}` : ''}`;
};

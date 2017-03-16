'use strict';

module.exports = ({
    packageJson,
    license,
    comments = {},
    binHelpers = []
}) => {
    let testText = getTestText(packageJson);

    return `# ${packageJson.name}

## install

\`npm i ${packageJson.name} --save\` or \`npm i ${packageJson.name} --save-dev\`

Install on global, using \`npm i ${packageJson.name} -g\`

${comments.rawReadDocs? comments.rawReadDocs.map(({text}) => text).join('\n') : ''}

${binHelpers.length? '## bin options\n': ''}
${binHelpers.map(({name, text}) => {
    return `\`\`\`

$ ./node_modules/${packageJson.name}/bin/${name} -h

${text}
\`\`\``;
})}
${testText? `
## run tests

npm test
`: ''}
${license?`## license

${license}` : ''}`;
};

let getTestText = (packageJson) => {
    let scripts = packageJson.scripts || {};
    let test = scripts.test;
    if(test==='echo \"Error: no test specified\" && exit 1') return '';
    return test;
};

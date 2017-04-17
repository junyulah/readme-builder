'use strict';

let path = require('path');

let {
    getFilesToc
} = require('dir-tree-info');

module.exports = ({devHelpers, packageJson, comments={}, projectDir}, lang) => {
    let testText = getTestText(packageJson);
    let fileDescriptionMap = getFileDescriptionMap(comments);

    return `## ${lang('develop')}

### ${lang('file structure')}

\`\`\`
${getFilesToc(devHelpers.filesTree, (name, file) => {
    file = path.relative(projectDir, file.path);
    return [name, fileDescriptionMap[file] || ''].join('    ');
})} 
\`\`\`

${testText? `
### ${lang('run tests')}

\`npm test\`
`: ''}`;
};

let getFileDescriptionMap = (comments) => {
    let fileDescriptions = comments.fileDescriptions || [];
    return fileDescriptions.reduce((prev, {file, firstLineParamText}) => {
        prev[file] = firstLineParamText;
        return prev;
    }, {});
};

let getTestText = (packageJson) => {
    let scripts = packageJson.scripts || {};
    let test = scripts.test;
    if(test === 'echo \"Error: no test specified\" && exit 1') return '';
    return test;
};

'use strict';

let {langs, getLang} = require('./language');

let langGuideMap = {
    'zh': '中文文档',
    'en': 'document'
};

module.exports = (opts) => {
    return langs.reduce((prev, type) => {
        let lang = getLang(type);
        prev[type] = getDoc(opts, lang, langs);
        return prev;
    }, {});
};

let getDoc = ({
    packageJson,
    license,
    comments = {},
    binHelpers = [],
    devHelpers = {}
}, lang, langTypes) => {
    let testText = getTestText(packageJson);

    return `# ${packageJson.name}

${packageJson.description}

${langTypes.map((type) => type === 'en'? `[${langGuideMap[type]}](./README.md)`: `[${langGuideMap[type]}](./README_${type}.md)`).join('   ')}

## ${lang('install')}

\`npm i ${packageJson.name} --save\` ${lang('or')} \`npm i ${packageJson.name} --save-dev\`

${lang('Install on global')}, ${lang('using')} \`npm i ${packageJson.name} -g\`

${comments.rawReadDocs? comments.rawReadDocs.map(({text}) => text).join('\n') : ''}

${binHelpers.length? `## ${lang('bin options')}\n`: ''}
${binHelpers.map(({name, text}) => {
    return `- ${name}

\`\`\`shell

$ ./node_modules/${packageJson.name}/bin/${name} -h

${text}
\`\`\``;
})}

## ${lang('develop')}

### file structure

\`\`\`
${getFilesToc(devHelpers.filesTree)} 
\`\`\`

${testText? `
### ${lang('run tests')}

\`npm test\`
`: ''}
${license?`## ${lang('license')}

${license}` : ''}`;
};

let getTestText = (packageJson) => {
    let scripts = packageJson.scripts || {};
    let test = scripts.test;
    if(test==='echo \"Error: no test specified\" && exit 1') return '';
    return test;
};

let getFilesToc = (filesTree) => {
    return getFileLines(filesTree).join('\n');
};

let getFileLines = ({
    name,
    type,
    files
}, depth = 0)=>{
    let unitSpace = '    ', connectSpace = '│   ', adjoinSpace = '│──', lastAdjoinSpace = '└──';

    if(type === 'file') {
        return [name];
    } else if(type === 'directory') {
        let nextDepth = ++depth;

        let nexts = files.map((file) => getFileLines(file, nextDepth));

        let lines = nexts.reduce((prev, next, index) => {
            let space = index === nexts.length - 1? unitSpace : connectSpace;
            return prev.concat(next.map((line, lineIndex) => {
                if(lineIndex === 0){
                    if(index === nexts.length - 1) return lastAdjoinSpace + line;
                    return adjoinSpace + line;
                } else {
                    return space + line;
                }
            }));
        }, []);

        lines.unshift(name);

        return lines;
    }
};

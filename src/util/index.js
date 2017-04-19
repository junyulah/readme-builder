'use strict';

let uuidV4 = require('uuid/v4');
let del = require('del');
let path = require('path');
let {
    runTestsWithParsedCode
} = require('defcomment');
let {filter} = require('bolzano');

let getTestInfoByRunIt = ({
    resultCode, testCode
}, srcPath) => {
    let testFile = path.join(path.dirname(srcPath), `${uuidV4()}.js`);
    let destFile = path.join(path.dirname(srcPath), `${uuidV4()}.js`);

    return runTestsWithParsedCode(resultCode, testCode, destFile, testFile, {
        silent: true
    }).then((rets) => {
        return del([testFile, destFile], {
            force: true
        }).then(() => rets);
    }).catch((err) => {
        return del([testFile, destFile], {
            force: true
        }).then(() => {
            throw err;
        });
    });
};

let testFailInformation = (sampleString, errorMsg) => {
    return `code is : \n\n${sampleString.split('\n').map((line) => `    ${line}`).join('\n')}.\n\nError information is : ${errorMsg}`;
};

/**
 * lang part dividing line
 * ${langType}:
 */
let filterTextByLang = (text, langType = 'en') => {
    let rets = [], curLang = 'en';
    let lines = text.split('\n');
    for(let i = 0;i < lines.length; i++) {
        let line = lines[i];
        let matchRet = matchLang(line);
        if(matchRet) {
            let {type, next} = matchRet;
            if(type === langType) {
                rets.push(next);
            }
            curLang = type;
        } else {
            if(curLang === langType) {
                rets.push(line);
            }
        }
    }

    return rets;
};

/**
 * lang part dividing line
 * ${langType}:
 */
let getLangText = (text, langType) => {
    return filterTextByLang(text, langType).join('\n');
};

let matchLang = (line) => {
    let ret = /^\s*\[readme\-lang\:(.*)\](.*)$/.exec(line);
    if(!ret) return false;
    return {type: ret[1], next: ret[2]};
};

let getModuleVarName = (file, testVariables) => {
    if (testVariables.r_c) return testVariables.r_c;
    return path.basename(file, path.extname(file));
};

let getModulePath = (packageJson, file) => {
    return file === packageJson.main ? packageJson.name : `${packageJson.name}/${file}`;
};

let hideLine = (text, hideSymbols = '@readme-hide') => {
    let lines = text.split('\n');
    return filter(lines, (line) => line.indexOf(hideSymbols) === -1).join('\n');
};

let processRawText = (text, langType) => {
    text = hideLine(text);
    let def = '';
    if(langType && langType !== 'en') {
        def = getLangText(text);
    }
    return getLangText(text, langType) || def;
};

module.exports = {
    getTestInfoByRunIt,
    testFailInformation,
    filterTextByLang,
    getLangText,
    getModuleVarName,
    getModulePath,
    hideLine,
    processRawText
};

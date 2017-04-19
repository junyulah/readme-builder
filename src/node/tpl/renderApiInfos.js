'use strict';

// let renderStdouts = require('./renderStdouts');
let {getLangText} = require('../../util');
let {getParamsDSL, getReturnDSL} = require('describe-data');
let {map, reduce} = require('bolzano');

module.exports = ({apiInfos}, lang, langType) => {
    if(apiInfos && apiInfos.length) {
        return `## ${lang('api')}
${apiInfos.map((apiInfo) => renderApi(apiInfo, lang, langType))}
`;
    }
};

let renderApi = ({testDescription, code, apiDes, testVariables}, lang, langType) => {
    if(!apiDes) return '';
    let paramDSL = getParamsDSL(apiDes);
    let returnDSL = getReturnDSL(apiDes);

    return map(paramDSL.patterns, (pattern) => {
        let params = getParams(pattern);
        let paramNames = map(params, ({alias}) => alias);
        let funName = getName(apiDes);
        return `###  ${getName(returnDSL)} = ${funName}(${map(paramNames, (name) => name || '_').join(', ')})

${getLangText(testDescription, langType)}

\`\`\`${testVariables? testVariables.tar : ''}
${code}
\`\`\`

${getParamsText(params)}

<ul>
${renderDataDSL(returnDSL)}
</ul>`;
    }).join('\n\n');
};

let getParams = (pattern) => {
    return reduce(pattern.nexts, (prev, dsl) => {
        let index = Number(dsl.name);
        if(!isNaN(index)){
            prev[index] = dsl;
        }

        return prev;
    }, []);
};

let getParamsText = (params) => {
    return `<ul>${map(params, renderDataDSL).join('')}</ul>`;
};

let renderDataDSL = (dataDSL) => {
    return `<li><code>${getName(dataDSL)}</code>${getType(dataDSL)}<div>${dataDSL.detail}</div>${renderPatterns(dataDSL)}</li>`;
};

let renderPatterns = (dataDSL) => {
    return `${map(dataDSL.patterns, ({type, nexts}, index) => {
        if(!nexts.length) return '';
        return `situation ${index + 1}, <code>${getName(dataDSL)}</code> 's type is ${type}
${renderNexts(nexts)}`;
    }).join('')}`;
};

let renderNexts = (nexts) => {
    return `<ul>${map(nexts, renderDataDSL).join('')}</ul>`;
};

let getType = (dataDSL) => {
    return getTypes(dataDSL).join(' | ');
};

let getName = (dataDSL) => dataDSL.alias || dataDSL.name;

let getTypes = (dataDSL) => {
    return map(dataDSL.patterns, (pattern) => pattern.type);
};

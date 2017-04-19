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

let renderApi = ({testDescription, code, apiDes}, lang, langType) => {
    return `${getFunDescription(apiDes)}

${getLangText(testDescription, langType)}

\`\`\`
${code}
\`\`\``;
};

let getFunDescription = (apiDes) => {
    let paramDSL = getParamsDSL(apiDes);
    return map(paramDSL.patterns, (pattern) => {
        let params = getParams(pattern);
        let paramNames = map(params, ({alias}) => alias);
        let funName = apiDes.alias || apiDes.name;
        return `<a name="${funName}"/>${funName} (${map(paramNames, (name) => name || '_').join(', ')})
    -----------

${getParamsText(params)}
`;
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
    return `<li>${dataDSL.alias || dataDSL.name}  ${getType(dataDSL)}<div>${dataDSL.detail}</div>${renderPatterns(dataDSL.patterns)}</li>`;
};

let renderPatterns = (patterns) => {
    return `<ul>${map(patterns, ({type, nexts}) => {
        if(!nexts.length) return '';
        return `<li>when type is ${type}
${renderNexts(nexts)}</li>`;
    }).join('')}</ul>`;
};

let renderNexts = (nexts) => {
    return `<ul>${map(nexts, renderDataDSL).join('')}</ul>`;
};

let getType = (dataDSL) => {
    return map(dataDSL.patterns, (pattern) => pattern.type).join(' | ');
};

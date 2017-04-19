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
        let signature = getSignature(apiDes, params, returnDSL);
        return `### ${signature}

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

let getSignature = (apiDes, params, returnDSL) => {
    let paramNames = map(params, ({alias}) => alias);
    let funName = getName(apiDes);
    return `${getName(returnDSL)}=${funName}(${map(paramNames, (name) => name || '_').join(', ')})`;
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
    let detailText = dataDSL.detail? `- ${dataDSL.detail}`: '';
    return `<li><strong>${getName(dataDSL)}</strong> ${getType(dataDSL)} ${detailText}<div>${renderPatterns(dataDSL)}</div></li>`;
};

let renderPatterns = (dataDSL) => {
    let len = dataDSL.patterns && dataDSL.patterns.length;
    return `${map(dataDSL.patterns, ({type, nexts}) => {
        if(!nexts.length) return '';
        let patternTypeDes = len? `<code>${getName(dataDSL)} (${type})</code>`: '';
        return `${patternTypeDes}
${renderNexts(nexts)}`;
    }).join('')}`;
};

let renderNexts = (nexts) => {
    return `<ul>${map(nexts, renderDataDSL).join('')}</ul>`;
};

let getType = (dataDSL) => {
    return `<code>(${getTypes(dataDSL).join(' | ')})</code>`;
};

let getName = (dataDSL) => dataDSL.alias || dataDSL.name;

let getTypes = (dataDSL) => {
    return map(dataDSL.patterns, (pattern) => pattern.type);
};

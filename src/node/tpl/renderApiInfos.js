'use strict';

let {processRawText} = require('../../util');
let {getParamsDSL, getReturnDSL} = require('describe-data');
let {map, reduce} = require('bolzano');

module.exports = ({apiInfos}, lang, langType) => {
    if(apiInfos && apiInfos.length) {
        return `## ${lang('api')}
${apiInfos.map((apiInfo) => renderApi(apiInfo, lang, langType))}
`;
    } else {
        return '';
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

${processRawText(testDescription, langType)}

\`\`\`${testVariables? testVariables.tar : ''}
${processRawText(code, langType)}
\`\`\`

${getParamsText(params, lang, langType)}

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

let getParamsText = (params, lang, langType) => {
    return `<ul>${map(params, (param) => renderDataDSL(param, lang, langType)).join('')}</ul>`;
};

let renderDataDSL = (dataDSL, lang, langType) => {
    let detailText = dataDSL.detail? `- ${processRawText(dataDSL.detail, langType)}`: '';
    return `<li><strong>${getName(dataDSL)}</strong> ${getType(dataDSL)} ${processRawText(detailText, langType)}<div>${renderPatterns(dataDSL, lang, langType)}</div></li>`;
};

let renderPatterns = (dataDSL, lang, langType) => {
    let len = dataDSL.patterns && dataDSL.patterns.length;
    return `${map(dataDSL.patterns, ({type, nexts}) => {
        if(!nexts.length) return '';
        let patternTypeDes = len? `<code>${getName(dataDSL)} (${type})</code>`: '';
        return `${patternTypeDes}
${renderNexts(nexts, lang, langType)}`;
    }).join('')}`;
};

let renderNexts = (nexts, lang, langType) => {
    return `<ul>${map(nexts, (next) => renderDataDSL(next, lang, langType)).join('')}</ul>`;
};

let getType = (dataDSL) => {
    return `<code>(${getTypes(dataDSL).join(' | ')})</code>`;
};

let getName = (dataDSL) => dataDSL.alias || dataDSL.name;

let getTypes = (dataDSL) => {
    return map(dataDSL.patterns, (pattern) => pattern.type);
};

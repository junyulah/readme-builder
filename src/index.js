'use strict';

let node = require('./node');

let docMap = {
    node
};

let {
    f, arg, df, d, p
} = require('describe-data');

/**
 * @readme-api
 *
 * ## test tar=js r_c=readmeBuilder api_des=output
 * // example
 * // readmeBuilder({
 * //    projectDir: path.resolve(__dirname, './project')
 * // })
 * console.log(JSON.stringify(readmeBuilder.__description)); // @readme-hide
 * <!--testEnd-->
 */

/**
 * TODO find blocks from stdouts
 */
module.exports = df(
    (opts, type = 'node') => {
        return docMap[type](opts);
    },

    f(
        'readmeBuilder',
        arg(
            d('0:options', p('Falsy'), p('Object', d('projectDir', 'The directory of project used to generate readme document\n[readme-lang:zh]要生成文档的项目的目录', p('String')))),

            d('1:type', 'Only support node right now\n[readme-lang:zh]目前只支持node项目', p('String'), p('Falsy'))
        ),
        d('result', p('Promise'))
    )
);

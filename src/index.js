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
 * ## test tar=js r_c=readmeBuilder
 * //
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
            d('0:options', p('Object', d('projectDir'))),

            d('1:type', 'only support node right now',p('String'), p('Falsy'))
        ),
        d('return')
    )
);

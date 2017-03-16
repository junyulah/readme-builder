'use strict';

let node = require('./node');

let docMap = {
    node
};

/**
 * generate readme doc
 */

module.exports = (opts, type = 'node') => {
    return docMap[type](opts);
};

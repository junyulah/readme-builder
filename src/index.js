'use strict';

let node = require('./node');

let docMap = {
    node
};

module.exports = (opts, type = 'node') => {
    return docMap[type](opts);
};

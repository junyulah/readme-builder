'use strict';

let docBuilder = require('../src');
let path = require('path');

describe('index', () => {
    it('base', () => {
        return docBuilder({
            projectDir: path.resolve(__dirname, './fixture/node/p0')
        }).then(ret => {
            console.log(ret);
        });
    });
});

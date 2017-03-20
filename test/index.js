'use strict';

let docBuilder = require('../src');
let path = require('path');

let toc = require('markdown-toc');

describe('index', () => {
    it('base', () => {
        return docBuilder({
            projectDir: path.resolve(__dirname, './fixture/node/p0')
        }).then(ret => {
            console.log(ret);
        });
    });

    it('toc', () => {
        console.log(toc(` 
<pre>
## test2
## test3
</pre>
            `).content);
    });
});

# readme-builder
[中文文档](./README_zh.md)   [document](./README.md)

 A simple tool used to generate read me doc for project
- [install](#install)
- [usage](#usage)
  * [quick run CLI](#quick-run-cli)
  * [CLI options](#cli-options)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i readme-builder --save` or `npm i readme-builder --save-dev`

Install on global, using `npm i readme-builder -g`



## usage

### quick run CLI

- buildreadme

run buildreadme in your project root


```shell
commands

$  cd ../test/fixture/node/p0
$  ./node_modules/.bin/buildreadme
```

<pre>output</pre>

<pre># test-p0</pre>
<pre></pre>
<pre>test p0 project</pre>
<pre></pre>
<pre>[中文文档](./README_zh.md)   [document](./README.md)</pre>
<pre></pre>
<pre>## install</pre>
<pre></pre>
<pre>`npm i test-p0 --save` or `npm i test-p0 --save-dev`</pre>
<pre></pre>
<pre>Install on global, using `npm i test-p0 -g`</pre>
<pre></pre>
<pre>## goal</pre>
<pre></pre>
<pre>our goal is blah blah...</pre>
<pre></pre>
<pre>## usage</pre>
<pre></pre>
<pre>### bin quick run</pre>
<pre></pre>
<pre></pre>
<pre>### bin options</pre>
<pre></pre>
<pre>- test</pre>
<pre></pre>
<pre>```shell</pre>
<pre></pre>
<pre>$ ./node_modules/test-p0/bin/test -h</pre>
<pre></pre>
<pre>test -h</pre>
<pre>      --a  a</pre>
<pre>      --b  b</pre>
<pre></pre>
<pre>```</pre>
<pre></pre>
<pre>## develop</pre>
<pre></pre>
<pre>### file structure</pre>
<pre></pre>
<pre>```</pre>
<pre>.</pre>
<pre>│──LICENSE</pre>
<pre>│──README.md</pre>
<pre>│──README_zh.md</pre>
<pre>│──bin</pre>
<pre>│   └──test.sh</pre>
<pre>│──index.js</pre>
<pre>└──package.json </pre>
<pre>```</pre>
<pre></pre>
<pre></pre>
<pre>### run tests</pre>
<pre></pre>
<pre>`npm test`</pre>
<pre></pre>
<pre>## license</pre>
<pre></pre>
<pre>MIT License</pre>
<pre></pre>
<pre>Copyright (c) 2017 chenjunyu</pre>
<pre></pre>
<pre>Permission is hereby granted, free of charge, to any person obtaining a copy</pre>
<pre>of this software and associated documentation files (the "Software"), to deal</pre>
<pre>in the Software without restriction, including without limitation the rights</pre>
<pre>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell</pre>
<pre>copies of the Software, and to permit persons to whom the Software is</pre>
<pre>furnished to do so, subject to the following conditions:</pre>
<pre></pre>
<pre>The above copyright notice and this permission notice shall be included in all</pre>
<pre>copies or substantial portions of the Software.</pre>
<pre></pre>
<pre>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR</pre>
<pre>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,</pre>
<pre>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE</pre>
<pre>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER</pre>
<pre>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,</pre>
<pre>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE</pre>
<pre>SOFTWARE.</pre>


write result to readme.md, just add `-w` option


```shell
commands

$  cd ../test/fixture/node/p0
$  ./node_modules/.bin/buildreadme -w
```




### CLI options

- buildreadme

```shell

$ ./node_modules/readme-builder/bin/buildreadme -h

Usage: buildreadme
    -p [project directory, default is current directory]
    -t [project type, default is node]
    -w [write to readme.md]


Options:
  -h, --help  Show help                                                [boolean]


```

## develop

### file structure

```
.
│──LICENSE
│──README.md
│──README_zh.md
│──bin
│   └──build-readme.js
│──index.js
│──package.json
│──src
│   │──index.js
│   └──node
│       │──collector
│       │   │──binHelpers.js
│       │   │──commentsContent.js
│       │   │──devHelpers.js
│       │   │──index.js
│       │   └──license.js
│       │──filesToc.js
│       │──index.js
│       └──processor
│           │──binQuickRunInfos.js
│           │──commentToDocVariables.js
│           └──index.js
└──test
    │──fixture
    │   └──node
    └──index.js 
```


### run tests

`npm test`

## license

MIT License

Copyright (c) 2017 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

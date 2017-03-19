# readme-builder

 A simple tool used to generate read me doc for project

[中文文档](./README_zh.md)   [document](./README.md)

## install

`npm i readme-builder --save` or `npm i readme-builder --save-dev`

Install on global, using `npm i readme-builder -g`



## usage

### bin quick run

- buildreadme

commands

```shell
$  cd ../test/fixture/node/p0
$  ./node_modules/.bin/buildreadme
```

output

<pre>
# test-p0

test p0 project

[中文文档](./README_zh.md)   [document](./README.md)

## install

`npm i test-p0 --save` or `npm i test-p0 --save-dev`

Install on global, using `npm i test-p0 -g`

## goal

our goal is blah blah...

## usage

### bin quick run


### bin options

- test

```shell

$ ./node_modules/test-p0/bin/test -h

test -h
      --a  a
      --b  b

```

## develop

### file structure

```
.
│──LICENSE
│──bin
│   └──test.sh
│──index.js
└──package.json 
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


</pre>


### bin options

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
│           │──binExampleDoc.js
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

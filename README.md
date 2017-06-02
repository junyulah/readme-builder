# readme-builder

[中文文档](./README_zh.md)   [document](./README.md)

 A simple tool used to generate read me doc for project
- [install](#install)
- [goal](#goal)
- [usage](#usage)
  * [CLI quick run](#cli-quick-run)
  * [CLI options](#cli-options)
  * [API quick run](#api-quick-run)
- [api](#api)
  * [result=readmeBuilder(options, type)](#resultreadmebuilderoptions-type)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i readme-builder --save` or `npm i readme-builder --save-dev`

Install on global, using `npm i readme-builder -g`

## goal

our goal is blah blah...

## usage

### CLI quick run

- buildreadme

run buildreadme in your project root



```shell
commands

    $  cd ../test/fixture/node/p0
    $  ./node_modules/.bin/buildreadme | head -c 200
    $  echo "\n\n......"
```

```
output

    # test-p0
    
    test p0 project
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    ## install
    
    `npm i test-p0 --save` or `npm i test-p0 --save-dev`
    
    Install on global, using `npm i test-p0 -g`
    
    ## 
    
    ......

```


write result to readme.md, just add `-w` option



```shell
commands

    $  cd ../test/fixture/node/p0
    $  ./node_modules/.bin/buildreadme -w
    $  ls README*
```

```
output

    README.md
    README_zh.md

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


### API quick run

quickest way to use readme builder api, just specify project directory

```js
let readmeBuilder = require('readme-builder')
let path = require('path');

readmeBuilder({
    projectDir: path.resolve(__dirname, './test/fixture/node/p0')
}).then((ret) => {
    console.log(ret.en.slice(0, 200) + '\n\n......\n\n\n'); // en version
    console.log(ret.zh.slice(0, 200) + '\n\n......\n\n'); // zh version
});
```

```
output

    # test-p0
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    test p0 project
    - [install](#install)
    - [goal](#goal)
    - [usage](#usage)
      * [CLI quick run](#cli-quick-run)
      * [CLI options](#cli-options)
    
    ......
    
    
    
    # test-p0
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    test p0 project
    - [安装](#%E5%AE%89%E8%A3%85)
    - [goal](#goal)
    - [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
      * [命令行快速运行](#%E5%91%BD%E4%BB%
    
    ......

```
## api
### result=readmeBuilder(options, type)



```js
let readmeBuilder = require('readme-builder/src/index.js')
// example
// readmeBuilder({
//    projectDir: path.resolve(__dirname, './project')
// })
```

<ul><li><strong>options</strong> <code>(Falsy | Object)</code> <div><code>options (Object)</code>
<ul><li><strong>projectDir</strong> <code>(String)</code> - The directory of project used to generate readme document<div></div></li></ul></div></li><li><strong>type</strong> <code>(String | Falsy)</code> - Only support node right now<div></div></li></ul>

<ul>
<li><strong>result</strong> <code>(Promise)</code> <div></div></li>
</ul>


## develop

### file structure

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──TODO.md    
│──bin    
│   └──build-readme.js    
│──index.js    
│──package.json    
│──src    
│   │──index.js    
│   │──node    
│   │   │──collector    
│   │   │   │──binHelpers.js    collect bin help info
│   │   │   │──commentsContent.js    
│   │   │   │──devHelpers.js    
│   │   │   │──index.js    
│   │   │   └──license.js    
│   │   │──index.js    
│   │   └──processor    
│   │       │──apiInfos.js    
│   │       │──binQuickRunInfos.js    
│   │       │──commentToDocVariables.js    
│   │       │──index.js    
│   │       └──jsQuickRunInfos.js    
│   └──util    
│       └──index.js    
└──test    
    │──fixture    
    │   └──node    
    └──function    
        │──index.js    
        └──testUtil.js     
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

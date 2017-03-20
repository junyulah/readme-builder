# readme-builder
[中文文档](./README_zh.md)   [document](./README.md)

 A simple tool used to generate read me doc for project
- [安装](#%E5%AE%89%E8%A3%85)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [快速运行命令行工具](#%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7)
  * [CLI 选项](#cli-%E9%80%89%E9%A1%B9)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i readme-builder --save` 或者 `npm i readme-builder --save-dev`

全局安装, 使用 `npm i readme-builder -g`



## 使用方法

### 快速运行命令行工具

- buildreadme

run buildreadme in your project root


```shell
命令

$  cd ../test/fixture/node/p0
$  ./node_modules/.bin/buildreadme
```

<pre>
输出

<span># test-p0</span>
<span></span>
<span>test p0 project</span>
<span></span>
<span>[中文文档](./README_zh.md)   [document](./README.md)</span>
<span></span>
<span>## install</span>
<span></span>
<span>`npm i test-p0 --save` or `npm i test-p0 --save-dev`</span>
<span></span>
<span>Install on global, using `npm i test-p0 -g`</span>
<span></span>
<span>## goal</span>
<span></span>
<span>our goal is blah blah...</span>
<span></span>
<span>## usage</span>
<span></span>
<span>### bin quick run</span>
<span></span>
<span></span>
<span>### bin options</span>
<span></span>
<span>- test</span>
<span></span>
<span>```shell</span>
<span></span>
<span>$ ./node_modules/test-p0/bin/test -h</span>
<span></span>
<span>test -h</span>
<span>      --a  a</span>
<span>      --b  b</span>
<span></span>
<span>```</span>
<span></span>
<span>## develop</span>
<span></span>
<span>### file structure</span>
<span></span>
<span>```</span>
<span>.</span>
<span>│──LICENSE</span>
<span>│──README.md</span>
<span>│──README_zh.md</span>
<span>│──bin</span>
<span>│   └──test.sh</span>
<span>│──index.js</span>
<span>└──package.json </span>
<span>```</span>
<span></span>
<span></span>
<span>### run tests</span>
<span></span>
<span>`npm test`</span>
<span></span>
<span>## license</span>
<span></span>
<span>MIT License</span>
<span></span>
<span>Copyright (c) 2017 chenjunyu</span>
<span></span>
<span>Permission is hereby granted, free of charge, to any person obtaining a copy</span>
<span>of this software and associated documentation files (the "Software"), to deal</span>
<span>in the Software without restriction, including without limitation the rights</span>
<span>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell</span>
<span>copies of the Software, and to permit persons to whom the Software is</span>
<span>furnished to do so, subject to the following conditions:</span>
<span></span>
<span>The above copyright notice and this permission notice shall be included in all</span>
<span>copies or substantial portions of the Software.</span>
<span></span>
<span>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR</span>
<span>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,</span>
<span>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE</span>
<span>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER</span>
<span>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,</span>
<span>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE</span>
<span>SOFTWARE.</span>

</pre>


write result to readme.md, just add `-w` option


```shell
命令

$  cd ../test/fixture/node/p0
$  ./node_modules/.bin/buildreadme -w
```




### CLI 选项

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

## 开发

### 文件结构

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


### 运行测试用例

`npm test`

## 许可证

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

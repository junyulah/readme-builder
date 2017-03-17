# readme-builder

 A simple tool used to generate read me doc for project

[中文文档](./README_zh.md)   [document](./README.md)

## 安装

`npm i readme-builder --save` or `npm i readme-builder --save-dev`

Install on global, 使用 `npm i readme-builder -g`



## usage

### bin 选项

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
[.](.)
│──[LICENSE](LICENSE)
│──[README.md](README.md)
│──[README_zh.md](README_zh.md)
│──[bin](bin)
│   └──[build-readme.js](bin/build-readme.js)
│──[index.js](index.js)
│──[package.json](package.json)
│──[src](src)
│   │──[index.js](src/index.js)
│   └──[node](src/node)
│       │──[binExample.js](src/node/binExample.js)
│       │──[binHelpDoc.js](src/node/binHelpDoc.js)
│       │──[commentToDocVariables.js](src/node/commentToDocVariables.js)
│       │──[devHelpDoc.js](src/node/devHelpDoc.js)
│       │──[filesToc.js](src/node/filesToc.js)
│       │──[index.js](src/node/index.js)
│       │──[renderFileToc.js](src/node/renderFileToc.js)
│       └──[tpl](src/node/tpl)
│           │──[index.js](src/node/tpl/index.js)
│           └──[language](src/node/tpl/language)
│               └──[index.js](src/node/tpl/language/index.js)
└──[test](test)
    │──[fixture](test/fixture)
    │   └──[node](test/fixture/node)
    └──[index.js](test/index.js) 
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

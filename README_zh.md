# readme-builder
[中文文档](./README_zh.md)   [document](./README.md)

 A simple tool used to generate read me doc for project

* [install](#install)
* [usage](#usage)
  + [quick run CLI](#quick-run-cli)
  + [CLI options](#cli-options)
* [develop](#develop)
  + [file structure](#file-structure)
  + [run tests](#run-tests)
* [license](#license)


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

"# test-p0\n\ntest p0 project\n\n[中文文档](./README_zh.md)   [document](./README.md)\n\n## install\n\n`npm i test-p0 --save` or `npm i test-p0 --save-dev`\n\nInstall on global, using `npm i test-p0 -g`\n\n## goal\n\nour goal is blah blah...\n\n## usage\n\n### bin quick run\n\n\n### bin options\n\n- test\n\n```shell\n\n$ ./node_modules/test-p0/bin/test -h\n\ntest -h\n      --a  a\n      --b  b\n\n```\n\n## develop\n\n### file structure\n\n```\n.\n│──LICENSE\n│──README.md\n│──README_zh.md\n│──bin\n│   └──test.sh\n│──index.js\n└──package.json \n```\n\n\n### run tests\n\n`npm test`\n\n## license\n\nMIT License\n\nCopyright (c) 2017 chenjunyu\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE."

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

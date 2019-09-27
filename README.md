# DeepEXI EggJs Scaffold Generator

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![Build Status](https://www.travis-ci.org/deepexi/generator-deepexi-eggjs.svg?branch=master)](https://www.travis-ci.org/deepexi/generator-deepexi-eggjs)
[![codecov](https://codecov.io/gh/deepexi/generator-deepexi-eggjs/branch/master/graph/badge.svg)](https://codecov.io/gh/deepexi/generator-deepexi-eggjs)

[npm-image]: https://img.shields.io/npm/v/generator-deepexi-eggjs.svg
[npm-url]: https://www.npmjs.com/package/generator-deepexi-eggjs
[download-image]: https://img.shields.io/npm/dm/generator-deepexi-eggjs.svg
[download-url]: https://www.npmjs.com/package/generator-deepexi-eggjs

此脚手架生成器基于[Yeoman](https://yeoman.io/)构建。

[CHANGELOG](./CHANGELOG.md)

## How To

### Getting Started

#### 1. 安装yeoman

```bash
$ npm install -g yo
```

#### 2. 安装generator-deepexi-eggjs

```bash
$ npm install -g generator-deepexi-eggjs
```

#### 3. 创建你的应用

通过交互模式创建

```bash
$ mkdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-eggjs
```

或者使用命令行模式创建

```bash
$ mkdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-eggjs -c
```

更多帮助信息可以通过以下命令查看

```bash
$ yo deepexi-eggjs --help
```

#### 4. 升级项目依赖（建议执行）

```bash
$ npm run autod
```

运行项目前推荐先升级依赖包（根据脚手架更新情况，其依赖的包版本可能不是最新的），以享受最新的特性。一般来说都是向前兼容的，可以放心地升级。

#### 5. 自行修改配置

脚手架对自动集成的第三方插件都提供了默认的配置，但是有一些外部资源依赖（如mysql db, eureka server等）可能需要你在生成项目后手动进行配置，否则项目可能无法直接运行。

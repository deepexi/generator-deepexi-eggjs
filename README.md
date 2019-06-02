# DeepEXI EggJs Scaffold

此脚手架基于[Yeoman](https://yeoman.io/)构建。

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

> 以上方式尚不支持，请先clone此项目到本地并npm link来进行使用

```bash
$ git clone http://gitlab.deepexi.top/taccisum/generator-deepexi-eggjs
$ cd generator-deepexi-eggjs
$ npm i
$ npm link
```

#### 3. 创建你的应用

```bash
$ mdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-eggjs
```


## Development Reference

### 扩展Prompting

修改`/generators/app/index.js#prompting()`方法进行扩展。

### 增加模板文件

所有模板文件必须以`*.tmpl.*`或`*.tmpl`命名，放在`/generators/app/templates`目录下。脚手架生成时会自动递归扫描该目录，并将模板进行解析，生成相应的文件。

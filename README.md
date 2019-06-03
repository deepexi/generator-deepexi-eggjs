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

通过交互模式创建

```bash
$ mdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-eggjs
```

或者使用命令行模式创建

```bash
$ mdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-eggjs -c
```

更多帮助信息可以通过以下命令查看

```bash
$ yo deepexi-eggjs --help
```

## Development Reference

### 扩展Prompting

修改`/generators/app/index.js#prompting()`方法进行扩展。

### 增加模板文件

所有模板文件必须以`*.tmpl.*`或`*.tmpl`命名，放在`/generators/app/templates`目录下。脚手架生成时会自动递归扫描该目录，并将模板进行解析，生成相应的文件。

### 指定template handler

如果不做特殊处理，所有的模板文件都会默认通过`/generators/app/handler/default_th`进行处理。

假如这并不能满足你的需求，你需要对某些模板文件做特殊的处理，可以在`/generators/app/handler`目录下扩展你的handler类（命名规范为`*_th.js`，th意为template handler）。该handler类必须继承自`/generators/app/handler/abstract_template_handler`。

最后在`/generators/app/handler/factory`中将你的handler与模板文件关联起来。

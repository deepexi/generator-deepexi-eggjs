# DeepEXI EggJs Scaffold

基于Yeoman


## How To

### 扩展Prompting

修改`/generators/app/index.js#prompting()`方法进行扩展。

### 增加模板文件

所有模板文件必须以`*.tmpl.*`或`*.tmpl`命名，放在`/generators/app/templates`目录下。脚手架生成时会自动递归扫描该目录，并将模板进行解析，生成相应的文件。

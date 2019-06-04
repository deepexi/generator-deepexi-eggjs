# ${projectName}

## 如何运行

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/${projectName}
```

<%
if(dependencies.swagger){
    print(`swagger地址：http://localhost:7001/swagger-ui.html\n`);
    print(`swagger json：http://127.0.0.1:7001/swagger-doc\n`);
}
%>

### 部署

#### 进程启动

```bash
$ npm i
$ npm start
$ npm stop
```

#### 容器启动

```bash
$ sh start-code.sh [-bl]
```

- -b: 是否从本地构建镜像
- -l: 是否在启动后输出容器日志

### 其它指令

- 使用 `npm run lint` 检查你的代码风格
- 使用 `npm test` 执行单元测试
- 使用 `npm run autod` 自动检查依赖升级，更多细节查看[autod](https://www.npmjs.com/package/autod)

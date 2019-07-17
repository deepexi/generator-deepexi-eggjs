#!/bin/bash

source ./common.sh

#----------------- 参数提取 start -----------------#
output_log=
build=

while getopts lb opt
do
    case $opt in
        l)
            output_log=true
            ;;
        b)
            build=true
            ;;
        ?)
            error "Usage: %s: [-b] [-l] args\n" $0
            exit 2
            ;;
    esac
done
#----------------- 参数提取 end -----------------#

#----------------- 启动逻辑 start -----------------#

cd `dirname $0`
<%
    let imgName = `img_name=$\{APP_NAME:-${projectName}\}:v$\{VERSION:-1.0.0\}`;
    if (orgName) {
        imgName = `${orgName}/${imgName}`
    }
    print(imgName);

    print(`\ncontainer_name=$\{APP_NAME:-${projectName}\}`)
%>

env=prod    # 应用执行环境
workers=4   # eggjs的worker数量

h1 '准备启动应用'$container_name'（基于docker）'

if [ ! -z $build ];then
    sh ./build.sh $img_name
fi 

info '删除已存在的容器' && docker rm -f $container_name

info '准备启动docker容器'
docker run -d --restart=on-failure:5 \
    -w /root \
    -p 7001:7001 \
    -v $PWD/logs/:/root/logs/  \
    -v $PWD/run/:/root/run/  \
    -v $PWD/override.js:/root/override.js \
    -e ENV=$env \
    -e WORKERS=$workers \
    --name $container_name $img_name

if [ $? -eq 0 ];then
    success '容器启动成功'
else
    error '容器启动失败'
    exit 4
fi

if [ ! -z $output_log ];then
    note '以下是docker容器启动输出，你可以通过ctrl-c中止它，这并不会导致容器停止'
    docker logs -f $container_name
fi

#----------------- 启动逻辑 end -----------------#

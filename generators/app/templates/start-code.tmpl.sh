#!/bin/bash

${commonScript}

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
    if (orgName) {
        print(`
img_name=${orgName}/${projectName}
        `)
    } else {
        print(`
img_name=${projectName}
        `)
    }
%>
container_name=${projectName}

h1 '准备启动应用'$container_name'（基于docker）'

if [ ! -z $build ];then
    info '获取最新代码'
    git pull
    [ ! $? -eq 0 ] && warn '获取最新代码失败'
    info '从本地构建镜像并运行'
    docker build -t $img_name .
    success '完成镜像构建'
fi 

info '删除已存在的容器' && docker rm -f $container_name

info '准备启动docker容器'
docker run -d --restart=on-failure:5 \
    -w /root \
    -p 7001:7001 \
    -v $PWD/logs/:/root/logs/  \
    -v $PWD/run/:/root/run/  \
    --name $container_name $img_name

success '容器启动成功'

if [ ! -z $output_log ];then
    note '以下是docker容器启动输出，你可以通过ctrl-c中止它，这并不会导致容器停止'
    docker logs -f $container_name
fi

#----------------- 启动逻辑 end -----------------#

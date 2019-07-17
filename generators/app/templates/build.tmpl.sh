#!/bin/bash

source ./common.sh

#----------------- 启动逻辑 start -----------------#

cd `dirname $0`

info '准备构建镜像：'$1

info '获取最新代码'
git pull
[ ! $? -eq 0 ] && warn '获取最新代码失败'
info '从本地构建镜像并运行'
docker build -t $1 .
if [ $? -eq 0 ];then
    success '完成镜像构建'
else
    error '构建镜像失败'
    exit 3
fi
#----------------- 启动逻辑 end -----------------#

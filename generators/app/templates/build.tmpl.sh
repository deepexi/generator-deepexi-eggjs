#!/bin/bash

source ./common.sh

cd `dirname $0`
<%
    print(`
img_name=$\{1:-$\{APP_NAME\}\}
img_ver=$\{2:-$\{VERSION\}\}
    `)
%>
info '准备构建镜像：'$img_name':'v$img_ver

info '获取最新代码'
git pull
[ ! $? -eq 0 ] && warn '获取最新代码失败'

info '执行镜像构建'
docker build -t $img_name':'v$img_ver .
if [ $? -eq 0 ];then
    success '完成镜像构建'
else
    error '构建镜像失败'
    exit 3
fi

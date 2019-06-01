#!/bin/bash

cd `dirname $0`
#更新代码
git pull

#下载依赖
#docker run --rm -v "$PWD":/root -w /root node npm install -g python && npm install

#构建镜像
docker build -t foreveross/fcbb-dc .

#删除容器
docker rm -f fcbb-dc &> /dev/null

docker run -d --restart=on-failure:5 \
    -w /root \
    -e nats_cid=crawler_api_1 \
    -p 5002:5002 \
    -v $PWD/logs/:/root/logs/  \
    -v $PWD/run/:/root/run/  \
    -v $PWD/node_modules/:/root/node_modules/  \
    --name fcbb-dc foreveross/fcbb-dc

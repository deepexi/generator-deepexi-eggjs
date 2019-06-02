#!/bin/bash

cd `dirname $0`

git pull

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

docker build -t $img_name

docker rm -f $container_name &> /dev/null
docker run -d --restart=on-failure:5 \
    -w /root \
    -p 7001:7001 \
    -v $PWD/logs/:/root/logs/  \
    -v $PWD/run/:/root/run/  \
    -v $PWD/node_modules/:/root/node_modules/  \
    --name $container_name $img_name

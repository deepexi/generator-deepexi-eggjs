#!/bin/bash

docker run -d --restart=on-failure:5 \
    -p 8080:8080 \
    -v $PWD/logs/:/root/logs/  \
    -v $PWD/run/:/root/run/  \
    -v /etc/localtime:/etc/localtime \
    -v $PWD/override.js:/root/override.js \
    -e ENV=$ENV \
    -e WORKERS=$WORKERS \
    --name $CONTAINER_NAME $IMAGE_NAME:v$IMAGE_VERSION

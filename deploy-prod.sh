#!/bin/sh

DATE=`date +%Y.%m.%d.%H.%M`
CONTAINER_NAME=vietnam-ultimate-container
IMAGE_NAME=vietnam-ultimate

git pull origin main

docker build -t $IMAGE_NAME:$DATE .

result=$(docker ps -q -f name=$CONTAINER_NAME:$DATE)

if [[ $? -eq 0 ]]; then
    echo "Delete old container"
    docker container rm -f $CONTAINER_NAME
fi

docker run -itd -p 3001:3000 --name $CONTAINER_NAME --network nvnhan-network --network-alias vietnam-ultimate-net $IMAGE_NAME:$DATE

docker image prune -a -f 

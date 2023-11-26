#!/bin/sh

DATE=`date +%Y.%m.%d.%H.%M`
CONTAINER_NAME=stg-vietnam-ultimate-container
IMAGE_NAME=stg-vietnam-ultimate
NETWORK_NAME=stg-vietnam-ultimate-net
EXPOSE_PORT=3003

BRANCH_NAME=$(git symbolic-ref --short -q HEAD)

if [[ $BRANCH_NAME == 'main' ]]; then
    CONTAINER_NAME=vietnam-ultimate-container
    IMAGE_NAME=vietnam-ultimate
    NETWORK_NAME=vietnam-ultimate-net
    EXPOSE_PORT=3001
fi

echo $BRANCH_NAME
echo $NETWORK_NAME
echo $IMAGE_NAME
echo $CONTAINER_NAME
echo $EXPOSE_PORT
echo $CONFIG_FILE_NAME;

git pull origin $BRANCH_NAME

docker build -t $IMAGE_NAME:$DATE .

result=$(docker ps -q -f name=$CONTAINER_NAME)

if [[ $? -eq 0 ]]; then
    echo "Delete old container"
    docker container rm -f $CONTAINER_NAME
fi

docker run -itd -p 127.0.0.1:$EXPOSE_PORT:3000 --name $CONTAINER_NAME --network nvnhan-network --network-alias $NETWORK_NAME $IMAGE_NAME:$DATE

git reset --hard HEAD
docker system prune -a -f

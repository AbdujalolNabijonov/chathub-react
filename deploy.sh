#!bin/bash
#PRODUCTION
git reset --hard
git checkout master 
git pull origin master

npm i yarn -g
yarn install
yarn add global serve
yarn run build

pm2 start "yarn run start:prod" --name=ChatHub-React

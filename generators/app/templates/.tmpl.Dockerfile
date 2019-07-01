FROM node:latest

USER root

WORKDIR /root

RUN chmod -R 777 /root

COPY . /root

# 在构建时就执行npm install，避免每次start都重新install
# 在docker中需要加上"--unsafe-perm"才能执行postinstall
RUN npm i --unsafe-perm --production

CMD npm start

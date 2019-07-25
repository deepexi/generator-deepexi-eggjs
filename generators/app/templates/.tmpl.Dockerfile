FROM deepexi/node:v0.0.1

USER root

WORKDIR /root

RUN chmod -R 777 /root

COPY . /root

# 在构建时就执行npm install，避免每次start都重新install
# 在docker中需要加上"--unsafe-perm"才能执行postinstall
RUN npm i --unsafe-perm --production

ADD entrypoint.sh /

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

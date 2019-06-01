# start filebeat
cd `dirname $0`

# 必填部署变量
# elk_env="dev"
# elk_logstash="183.6.43.125:5044"

# 修改filebeat.yml配置
git checkout -- filebeat.yml
<%= "sed -i s/{{elk_env}}/$elk_env/ filebeat.yml" %>
<%= "sed -i s/{{elk_logstash}}/$elk_logstash/ filebeat.yml" %>

app_id={{projectName}}

# 删除容器
docker rm -f fb-$app_id

docker run -d \
    --name fb-$app_id \
    -v $PWD/filebeat.yml:/usr/share/filebeat/filebeat.yml \
    -v $PWD/logs/:/var/logs/ \
    docker.elastic.co/beats/filebeat:7.0.0

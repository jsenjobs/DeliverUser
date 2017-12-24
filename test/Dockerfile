# 指定我们的基础镜像是node，版本是v8.0.0
# FROM node:8.0.0
FROM centos:centos7.1.1503
# 指定制作我们的镜像的联系人信息（镜像创建者）
MAINTAINER Jsen
ENV TZ "Asia/Shanghai"

WORKDIR /usr/local/src

ADD http://mirrors.aliyun.com/repo/Centos-7.repo /etc/yum.repos.d/CentOS-Base.repo
ADD http://mirrors.aliyun.com/repo/epel-7.repo /etc/yum.repos.d/epel.repo

# 安装项目依赖包
#安装supervisor=============================重点=================================
RUN yum -y install python-setuptools && \
    easy_install supervisor && \
    yum install -y nginx && \
    yum install -y lsof && \
    yum clean all

ADD	./dockerconf/supervisord.conf /etc/supervisord.conf
COPY ./dist /usr/share/nginx/html/

# 配置环境变量
# ENV HOST 0.0.0.0
# ENV PORT 8000

EXPOSE 80

# 容器启动时执行的命令，类似npm run start
CMD /usr/bin/supervisord -c /etc/supervisord.conf

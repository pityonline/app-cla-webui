FROM node:alpine as NodeEnv

MAINTAINER TommyLike<tommylikehu@gmail.com>

RUN mkdir -p /home/cla-webui
WORKDIR /home/cla-webui
COPY package.json package-lock.json .npmrc ./
RUN npm install -g vue && \
    npm install

FROM NodeEnv as Builder
COPY . ./
RUN npm run build

FROM nginx:1.19.2
COPY --from=Builder /home/cla-webui/dist /usr/share/nginx/html/
COPY ./deploy/default.conf /etc/nginx/conf.d/
RUN chmod -R 755 /usr/share/nginx/html
ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

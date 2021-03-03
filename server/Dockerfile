# FROM node:alpine
# WORKDIR "/app"
# COPY ./package.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "run", "start"]


#Production Environment
FROM nginx
# COPY default.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf


#docker run -d -p 8080:80 --link node-server:server --name nginx-proxy  docknginx
FROM nginx:latest
COPY . /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80
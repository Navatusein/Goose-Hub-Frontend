FROM node:18-alpine as build
WORKDIR /app
ADD package.json .
RUN npm install
ADD ./ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY environment.sh /docker-entrypoint.d/environment.sh
RUN chmod +x /docker-entrypoint.d/environment.sh
EXPOSE 80
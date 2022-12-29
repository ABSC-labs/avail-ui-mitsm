FROM node:19-alpine AS builder
WORKDIR /app
COPY public/ ./public/
COPY src/ ./src/
COPY .eslintignore .eslintrc.cjs custom.d.ts index.html package.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN npm i --force
RUN npm run build


FROM nginx:1.23.3-alpine AS nginx
RUN apk update && \
    apk upgrade
COPY --from=builder /app/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;" ]
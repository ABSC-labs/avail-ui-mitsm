FROM node:19.2-alpine AS builder
WORKDIR /app
COPY public/ ./public/
COPY src/ ./src/
COPY .eslintignore .eslintrc.cjs custom.d.ts index.html package.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN ls -al
RUN npm i --force
RUN npm run build


FROM nginx:stable-alpine AS nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;" ]
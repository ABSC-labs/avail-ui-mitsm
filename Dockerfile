FROM node:19-alpine AS builder
WORKDIR /app

ARG keycloak_service_protocol
ARG keycloak_service_host
ARG keycloak_service_port
ARG keycloak_realm
ARG keycloak_client_id

ENV KEYCLOAK_SERVICE_PROTOCOL=$keycloak_service_protocol
ENV KEYCLOAK_SERVICE_HOST=$keycloak_service_host
ENV KEYCLOAK_SERVICE_PORT=$keycloak_service_port
ENV VITE_KEYCLOAK_REALM=$keycloak_realm
ENV VITE_KEYCLOAK_CLIENT_ID=$keycloak_client_id

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
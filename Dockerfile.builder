FROM node:19-alpine AS builder

RUN apk update && \
    apk upgrade

WORKDIR /app

COPY public/ ./public/
COPY src/ ./src/
COPY .eslintignore .eslintrc.cjs custom.d.ts index.html package.json tsconfig.json tsconfig.node.json vite.config.ts ./

RUN pwd
RUN ls

RUN npm i --force

CMD ["npx", "vite", "build", "--outDir", "/tmp"]
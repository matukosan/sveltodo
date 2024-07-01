FROM node:lts-alpine

RUN npm i -g pnpm@latest

# all files needed for the build
COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .

# all folders needed for the build
COPY src src/

RUN pnpm install --frozen-lockfile

RUN npx svelte-kit sync

RUN pnpm build

EXPOSE 8080

CMD ["node", "build"]

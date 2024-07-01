FROM node:lts-alpine

# all files needed for the build
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .

# all folders needed for the build
COPY src src/

RUN yarn install --frozen-lockfile

RUN npx svelte-kit sync

RUN yarn build

EXPOSE 8080

CMD ["node", "build"]

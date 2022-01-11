FROM node:lts-alpine3.15
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:lts-alpine3.15
WORKDIR /usr
COPY package.json ./
COPY prisma ./prisma
RUN npm install --only=production
RUN npx prisma generate
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 8088
CMD ["pm2","start","src/server.js","--no-daemon"]
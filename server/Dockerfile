
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production --no-audit --prefer-online
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/server.js"]

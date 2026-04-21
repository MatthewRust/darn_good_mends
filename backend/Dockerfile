FROM node:22-alpine
WORKDIR /app

ENV NODE_OPTIONS=--dns-result-order=ipv4first

COPY package*.json ./
RUN npm config set fetch-retries 5 \
	&& npm config set fetch-retry-mintimeout 20000 \
	&& npm config set fetch-retry-maxtimeout 300000 \
	&& npm config set fetch-timeout 600000 \
	&& npm config set registry https://registry.npmjs.org/ \
	&& (npm install --no-audit --fund=false || npm install --no-audit --fund=false || npm install --no-audit --fund=false)

COPY . .
EXPOSE 8787

CMD ["npm", "run", "dev"]

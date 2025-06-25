# ============================
# BUILD STAGE
# ============================
FROM node:22-alpine3.22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VERSION
ENV VITE_FRONT_VERSION=$VERSION

# ============================
# DEVELOPMENT IMAGE (ONLY IF TARGETED)
# ============================
FROM build AS development

ARG VERSION
ENV VITE_FRONT_VERSION=$VERSION

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "dev"]

# ============================
# PRODUCTION BUILD
# ============================
FROM build AS prod

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VERSION
ENV VITE_FRONT_VERSION=$VERSION

RUN npm run build

# ============================
# FINAL IMAGE (DEFAULT: PRODUCTION)
# ============================
FROM nginx:1.28-alpine3.21-slim AS production

LABEL org.opencontainers.image.source=https://github.com/INFCDAAL1/resources-relationnelles-vue

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=prod /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
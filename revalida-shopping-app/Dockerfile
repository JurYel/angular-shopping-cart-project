# Step 1: Build Angular app
FROM node:16-alpine AS Build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Step 2: Serve the Angular app using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/revalida-shopping-app usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
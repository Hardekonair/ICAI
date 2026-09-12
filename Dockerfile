# it create an environemnt named as frontend-builder and provide it node version and linux os
FROM node:20-alpine AS frontend-builder

# here we are copying the fronend entire folder into the app name directory
COPY ./01_FRONTEND /app

# loading the frontend directory
WORKDIR /app

#since our nodemodules are in git ignore we need to install all the node dependencies in this app dir again
RUN npm install

ARG VITE_CLIENT_ID
ENV VITE_CLIENT_ID=754032587549-46dr6iu4gdvlu92mblu9gqmr829kjdh2.apps.googleusercontent.com

# creating dist folder
RUN npm run build

# build the backend, fresh new environment
FROM node:20-alpine 

COPY ./02_BACKEND /app

WORKDIR /app

RUN npm install

# here we are copying the dist folder created from npm build into the backend
COPY --from=frontend-builder /app/dist /app/public

CMD ["node","server.js"]

# docker built . -t server -> to create image
# docker run -p 4000:5000 server -> to create container


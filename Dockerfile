FROM node:18
COPY server /home/node/app/server/
COPY client/build /home/node/app/client/build/
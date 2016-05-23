FROM mhart/alpine-node:5.5

WORKDIR /royalapi
EXPOSE 7000/tcp
COPY . /royalapi/
RUN npm install
RUN npm run build
CMD ["npm", "start"]

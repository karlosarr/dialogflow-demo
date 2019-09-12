# use a pm2 node base image
FROM keymetrics/pm2:8-alpine

ENV NODE_ENV=production

RUN npm install pm2 -g

#RUN pm2 install pm2-server-monit

# set maintainer
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# tell docker what port to expose
EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production"]

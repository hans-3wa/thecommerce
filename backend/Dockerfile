FROM node:18.5
# Create app directory
RUN mkdir -p /app/backend
WORKDIR /app/backend

# Install app dependencies
COPY package.json /app/backend
RUN npm install

# Bundle app source
COPY . /app/backend

EXPOSE 5300
CMD [ "npm", "start" ]
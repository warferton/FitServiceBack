FROM node:14


# Create app directory
WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#Configure Prisma Client
RUN npm install -g prisma
RUN prisma generate

RUN npm run build

# Copy migration schema to workdir
COPY ./prisma/schema.prisma ./build/prisma/

WORKDIR /usr/app/build


EXPOSE 8002
CMD prisma migrate dev --name service_1_mig && (node nats_entities/nats-sub.js & node nats_entities/nats-pub.js)

# FitServiceBack

## EN

### About
Two services communicating through NATS server. Each service has __Publisher__ and __Subscriber__　modules (nats-pub & nats-sub respectively).  Upon bringing up the container cluster the services would publish random string messages of two words for 10 minutes, 1 _msg_/_min_, each recieved message is stored in a serivce's database. After 10 minutes each publisher will send a 'close' message to subject that the opposite service is subscribed to (`messages.service.1` for __service_1__, and `messages.service.2` for __service_2__) and finish working.  Upon recieveing the 'close' message both subscriers also stop working.

### Tech Used
 - [NodeJs](https://nodejs.org/en/)
 - [NATS NodeJs Client](https://github.com/nats-io/nats.js)
 - [Prisma](https://github.com/prisma/prisma)
 - [PostgreSQL](https://www.postgresql.org/)

### Default Settings
__Service One DB__:
- `POSTGRES_USER:` postgres_1
- `POSTGRES_PASSWORD:` password
- `TIME_ZONE:` "Asia/Novosibirsk"

__Service Two DB__:
- `POSTGRES_USER:` postgres_2
- `POSTGRES_PASSWORD:` password
- `TIME_ZONE:` "Asia/Novosibirsk"

### Docker Images Used
|PostgreSQL | NATS |
|-----------|---------|
|[postgres:13-alpine](https://hub.docker.com/_/postgres/)| [nats:latest](https://hub.docker.com/_/nats)|

## Run

```
> docker-compose up --build -d
```


## RU

### About
Два приложения, взаимодействующие через сервер NATS. У каждого сервиса есть  __Publisher__ и __Subscriber__ модули (файлы nats-pub & nats-sub соответственно).  После поднятия кластера оба сервиса начинают отправлять текстовые сообщения из двух случайных слов в течении 10 минут, 1 сообщение в минуту, каждое полученное сообщение заносится в базу данных сервиса.  После 10 минут каждый сервис отправляет 'close' сообщение на аддрес который прослушивается другим сервисом(`messages.service.1` для __service_1__, и `messages.service.2` для __service_2__) и завершает свою работу.  По получении 'close' сообщения модуль прослушивания так же завершает работу.

### Технологии
 - [NodeJs](https://nodejs.org/en/)
 - [NATS NodeJs Client](https://github.com/nats-io/nats.js)
 - [Prisma](https://github.com/prisma/prisma)
 - [PostgreSQL](https://www.postgresql.org/)

### Стандартные Параметры
__Service One DB__:
- `POSTGRES_USER:` postgres_1
- `POSTGRES_PASSWORD:` password
- `TIME_ZONE:` "Asia/Novosibirsk"

__Service Two DB__:
- `POSTGRES_USER:` postgres_2
- `POSTGRES_PASSWORD:` password
- `TIME_ZONE:` "Asia/Novosibirsk"

### Docker Изображения
|PostgreSQL | [postgres:13-alpine](https://hub.docker.com/_/postgres/)|
|-----------|---------|
|NATS | [nats:latest](https://hub.docker.com/_/nats)|



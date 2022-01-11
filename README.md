# Boilerplate for APIs
This is a simple boilerplate for APIs with Express.js | Typescript | PrismaORM | Jest

## Usage
Install all dependencies
```sh
yarn install
```
To start a development server
```sh
yarn dev
```
To build for production
```sh
yarn build
```
To start a production server with pm2
```sh
yarn start
```
To build a docker image
```sh
docker build -t express-app .
```
To run docker container
```sh
docker run --env-file ./.env -it -p 8088:8088 -e "DATABASE_URL=postgresql://user:pass@dbhost:5432/postgres?schema=public" --rm --name express-app express-app
```
> its necessary pass the DATABASE_URL environment variable by the command because the prisma has a limitation

## Features
This boilerplate has some pre configurated modules:

### 1) Auth module
---
#### REGISTER USER
- Request
```sh
[POST] http://localhost/user/register

{
    "email": "example@email.com",
    "password":"123456",
    "name":"Example User"
}
```

- Response
```sh
{
    "id": "bbf5e03d-8589-4b65-9ff7-b5cb518cdcb1",
    "name": "Example User",
    "email": "example@email.com",
    "password": "$2a$10$7NFEOPNmTnYnbqQjhrJLdOzZwZANyMzmvHdX0UD7g8LJoQ3Xk445q",
    "created_at": "2022-01-11T03:25:29.401Z"
}
```
---
#### LOGIN
- Request
```sh
[POST] http://localhost/user/login

{
    "email": "example@email.com",
    "password":"123456"
}
```

- Response
```sh
{
    
    "auth": true,
    "token": "{jwt-token}"
}
```
---
#### PROTECTED ROUTE TEST
- Request
```sh
[GET] http://localhost/user/protected

{
    "Authorization": "Bearer {token}"
}
```

- Response
```sh
{
    "auth": true
}
```

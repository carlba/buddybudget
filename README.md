## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Prerequisites

Start a Postgres server on localhost port 5432.  The server should grant full access to a database called `buddybudget`
with login credentials `buddybudget:buddybudget`.  (Could be achieved by running `docker-compose up buddybudget-sql`.)

## Running the App
 
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Boilerplate
1. nest new buddybudget
2. cd buddybudget
3. nest new ng-app client ## Select don't initialize
4. ng new client
5. npm i --save @nestjs/typeorm typeorm
6. npm install pg --save
7. ng add @angular/material

## Support

## Upload data
```bash
curl -F upload=@data/trans.xlsx "http://localhost:3000/api/transactions/batch/xlxs?format=skandia"
```

```bash
curl -F upload=@data/statement.xlsx "http://localhost:3000/api/transactions/batch/xlxs?format=norwegian"
```

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

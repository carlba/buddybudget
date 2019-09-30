## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

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
nest new buddybudget
cd buddybudget
nest new ng-app client ## Select don't initialize
ng new client
npm i --save @nestjs/typeorm typeorm
npm install pg --save
ng add @angular/material

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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites

* Node >= 12
* Docker >= 18 and Docker Compose
* Angular CLI installed globally `npm install -g @angular/cli`

## Installation

```bash
npm install
```

## Running the App
 
```bash
docker-compose up buddybudget-sql
npm run build
npm run start:prod
```

Both the frontend and backend is served by the node backend on port 3000.

* The frontend is accessible at <http://localhost:3000>
* The backend routes is exposed at <http://localhost:3000/api>

## Setting up Development Environment
The best development experience is achieved, like so

1. Ensure database is running
   
   ```bash
   docker-compose up buddybudget-sql   
   ```
2. The backend can then be started, like so:

   ```bash
   npm run start
   ```

   To restart the backend automatically on file changes and enable debugging
   use this command instead:

   ```bash
   npm run start:debug
   ```

2. Start the frontend
   
   ```bash
   ng serve
   ```

The frontend and backend will now be available on port 4200 and 3000, respectively. And both will be reloaded 
automatically on changes.

## Inserting data

```bash
curl -F upload=@data/trans.xlsx "http://localhost:3000/api/transactions/batch/xlxs?format=skandia"
```

```bash
curl -F upload=@data/statement.xlsx "http://localhost:3000/api/transactions/batch/xlxs?format=norwegian"
```

## Test

Test coverage has not yet been implemented, coming soon.

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Boilerplate

These are the initial commands used to create this project.

1. nest new buddybudget
2. cd buddybudget
3. nest new ng-app client ## Select don't initialize
4. ng new client
5. npm i --save @nestjs/typeorm typeorm
6. npm install pg --save
7. ng add @angular/material

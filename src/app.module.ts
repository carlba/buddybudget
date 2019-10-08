import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AngularModule } from './angular/angular.module';
import {
  PostgresConnectionOptions
} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';

const typeOrmConfig = {
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  type: 'postgres',
  url: 'postgres://buddybudget:buddybudget@localhost:5432/buddybudget',
} as PostgresConnectionOptions;

@Module({
  imports: [
    AngularModule.forRoot({
      rootPath: __dirname + '/client'
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

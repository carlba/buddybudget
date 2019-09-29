import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AngularModule } from './angular/angular.module';
import {
  PostgresConnectionOptions
} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmConfig = {
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  type: 'postgres',
  url: 'postgres://buddybudget:buddybudget@localhost:5432/buddybudget',
} as PostgresConnectionOptions;

@Module({
  imports: [
    AngularModule.forRoot({
      rootPath: 'client/dist/client'
    }),
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

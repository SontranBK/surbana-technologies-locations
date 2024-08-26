import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Location } from './app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'location_user',
      password: 'location_password',
      database: 'location_db',
      entities: [Location],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Location]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

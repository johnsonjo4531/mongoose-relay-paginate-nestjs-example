import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { relayPaginatePlugin } from 'mongoose-relay-paginate';
import { CatsModule } from './cats.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      connectionFactory: (connection) => {
        connection.plugin(
          relayPaginatePlugin({
            maxLimit: 100,
          }),
        );
        return connection;
      },
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

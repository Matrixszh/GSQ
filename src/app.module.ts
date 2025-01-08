import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';
import { DocumentModule } from './document/document.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Zain1:zartaq007@geocluster.dk6df.mongodb.net/geospatial?retryWrites=true&w=majority',
    ),
    CityModule,
    DocumentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';
import { MusicModule } from './music/music.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    WeatherModule,
    MusicModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
})
export class AppModule {}

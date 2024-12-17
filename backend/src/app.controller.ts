import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';
import { MusicService } from './music/music.service';

@Controller()
export class AppController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly musicService: MusicService,
  ) { }

  @Get('suggest-music')
  async suggestMusic(
    @Query('city') city: string,
  ): Promise<{ track: string; playlist: string } | any> {
    try {
      const data = await this.weatherService.getTemperature(city);

      if ('error' in data) return data;

      const musicSuggestion = await this.musicService.getMusicSuggestion(
        Math.floor(data.temp),
      );
      return { musicInfo: { ...musicSuggestion }, weatherInfo: { ...data } };
    } catch (error) {
      return {
        error: true,
        message: error.message || 'We had a problem trying to get the data.',
      };
    }
  }
}

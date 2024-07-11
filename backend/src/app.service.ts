import { Injectable } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';
import { MusicService } from './music/music.service';

@Injectable()
export class AppService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly musicService: MusicService,
  ) {}

  async suggestMusic(city: string): Promise<{ track: string; playlist: string } | any> {
    try {
      const data = await this.weatherService.getTemperature(city);

      if ('error' in data) return data;

      const musicSuggestion = await this.musicService.getMusicSuggestion(data.temp);
      return { ...musicSuggestion, ...data };
    } catch (error) {
      return {
        error: true,
        message: 'We had a problem trying to get the data.',
      };
    }
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from '../weather/weather.service';
import { MusicService } from '../music/music.service';

@Controller()
export class AppController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly musicService: MusicService,
  ) {}

  @Get('suggest-music')
  async suggestMusic(@Query('city') city: string): Promise<string> {
    const temp = await this.weatherService.getTemperature(city);
    return this.musicService.getMusicSuggestion(temp);
  }
}

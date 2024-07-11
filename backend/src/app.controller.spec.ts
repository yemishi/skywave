import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { WeatherService } from './weather/weather.service';
import { MusicService } from './music/music.service';

type WeatherInfoType = {
  temp: any;
  feels_like: any;
  temp_min: any;
  temp_max: any;
  pressure: any;
  humidity: any;
  description: string;
  icon: string;
  name: string;
  country: string;
};

type ErrorType = {
  error: true;
  message: string;
};

describe('AppController', () => {
  let appController: AppController;
  let weatherService: WeatherService;
  let musicService: MusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getTemperature: jest.fn(),
          },
        },
        {
          provide: MusicService,
          useValue: {
            getMusicSuggestion: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    weatherService = module.get<WeatherService>(WeatherService);
    musicService = module.get<MusicService>(MusicService);
  });

  describe('suggestMusic', () => {
    it('should return music suggestion based on temperature', async () => {
      const city = 'Rio de Janeiro';
      const temperatureData: WeatherInfoType = {
        temp: 30,
        feels_like: 32,
        temp_min: 25,
        temp_max: 35,
        pressure: 1013,
        humidity: 60,
        description: 'clear sky',
        icon: '01d',
        name: 'Rio de Janeiro',
        country: 'BR'
      };
      const musicSuggestion = { track: 'Summer Song', playlist: 'Summer Hits' };

      jest.spyOn(weatherService, 'getTemperature').mockResolvedValue(temperatureData);
      jest.spyOn(musicService, 'getMusicSuggestion').mockResolvedValue(musicSuggestion);

      const result = await appController.suggestMusic(city);
      expect(result).toEqual({ ...musicSuggestion, ...temperatureData });
      expect(weatherService.getTemperature).toHaveBeenCalledWith(city);
      expect(musicService.getMusicSuggestion).toHaveBeenCalledWith(temperatureData.temp);
    });

    it('should return error message if weather service fails', async () => {
      const city = 'Rio de Janeiro';
      const errorData: ErrorType = { error: true, message: 'City not found' };

      jest.spyOn(weatherService, 'getTemperature').mockResolvedValue(errorData);

      const result = await appController.suggestMusic(city);
      expect(result).toEqual(errorData);
      expect(weatherService.getTemperature).toHaveBeenCalledWith(city);
      expect(musicService.getMusicSuggestion).not.toHaveBeenCalled();
    });

    it('should handle exceptions and return error message', async () => {
      const city = 'Rio de Janeiro';

      jest.spyOn(weatherService, 'getTemperature').mockRejectedValue(new Error('Service error'));

      const result = await appController.suggestMusic(city);
      expect(result).toEqual({
        error: true,
        message: 'We have an problem trying to get data.',
      } as ErrorType);
      expect(weatherService.getTemperature).toHaveBeenCalledWith(city);
      expect(musicService.getMusicSuggestion).not.toHaveBeenCalled();
    });
  });
});

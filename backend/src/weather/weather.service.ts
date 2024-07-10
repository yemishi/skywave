import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.OPENWEATHER_KEY;

  async getCoordinates(
    city: string,
  ): Promise<{ lat: number; lon: number } | { error: true; message: string }> {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`,
      );
      const data = response.data[0];
      if (!data)
        return {
          error: true,
          message: `We couldn't find ${city}, it really exists?`,
        };
      return { lat: data.lat, lon: data.lon };
    } catch {
      return {
        error: true,
        message: 'We had an problem trying to get the location',
      };
    }
  }

  async getTemperature(city: string): Promise<
    | (WeatherInfoType & {
        description: string;
        icon: string;
        name: string;
        country: string;
      })
    | { error: true; message: string }
  > {
    const data = await this.getCoordinates(city);
    if ('error' in data) return data;

    const { lat, lon } = data;
    const response = (await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`,
    )) as {
      data: {
        main: WeatherInfoType;
        weather: [{ description: string; icon: string }];
        name: string;
        sys: { country: string };
      };
    };
    const { description, icon } = response.data.weather[0];
    const { feels_like, temp_max, temp, temp_min } = response.data.main;
    return {
      feels_like,
      temp,
      temp_max,
      temp_min,
      description,
      country: response.data.sys.country,
      name: response.data.name,
      icon,
    };
  }
}

interface WeatherInfoType {
  feels_like: string;
  temp: number;
  temp_max: number;
  temp_min: number;
}

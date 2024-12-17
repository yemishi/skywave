interface ResponseType {
  musicInfo: MusicInfoType
  weatherInfo: WeatherInfoType
}
type WeatherInfoType = {
  feels_like: string;
  name: string;
  country: string;
  description: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  icon: string;
  error?: boolean;
  message?: string
}
type MusicInfoType = {
  track: string;
  playlist: string;
  error?: boolean;
  message?: string
}
export type { ResponseType, MusicInfoType, WeatherInfoType };

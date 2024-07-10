interface ResponseType {
  feels_like: string;
  name: string;
  country: string;
  description: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  track: string;
  playlist: string;
  icon: string;
  error: false;
}

export type { ResponseType };

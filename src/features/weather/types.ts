export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly?: {
    time: string[];
    relativehumidity_2m?: number[];
    direct_radiation?: number[];
  };
  daily?: {
    time: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
}

export interface TwoHourAreaForecast {
  area: string;
  forecast: string; // "Showers" | "Fair" | ...
}

export type Station = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  country?: string;
  meta?: Record<string, unknown>;
};

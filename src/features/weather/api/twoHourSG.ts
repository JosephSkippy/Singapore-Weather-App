export interface TwoHourAreaForecast {
  area: string;
  forecast: string;
}

export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export async function getTwoHourData(): Promise<{
  stations: Station[];
  forecasts: TwoHourAreaForecast[];
}> {
  const res = await fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast");
  if (!res.ok) throw new Error(`2-hour forecast ${res.status}`);

  const data = await res.json();

  const stations: Station[] = data.area_metadata.map((a: any) => ({
    id: a.name,
    name: a.name,
    lat: a.label_location.latitude,
    lng: a.label_location.longitude,
  }));

  const forecasts: TwoHourAreaForecast[] = data.items[0]?.forecasts.map((f: any) => ({
    area: f.area,
    forecast: f.forecast,
  }));

  return { stations, forecasts };
}

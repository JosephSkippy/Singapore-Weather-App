import { useEffect, useState } from "react";
import { getTwoHourData, Station, TwoHourAreaForecast } from "@/features/weather/api/twoHourSG";


export function useStationsAndForecasts() {
  const [stations, setStations] = useState<Station[]>([]);
  const [forecasts, setForecasts] = useState<TwoHourAreaForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast");
        const data = await res.json();

        // Transform station data
        const stationsData: Station[] = data.area_metadata.map((a: any) => ({
          id: a.name,
          name: a.name,
          lat: a.label_location.latitude,
          lng: a.label_location.longitude,
        }));

        // Transform forecast data
        const forecastData: TwoHourAreaForecast[] = data.items[0]?.forecasts.map((f: any) => ({
          area: f.area,
          forecast: f.forecast,
        }));

        setStations(stationsData);
        setForecasts(forecastData);
      } catch (error) {
        console.error("Failed to fetch stations and forecasts", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { stations, forecasts, loading };
}

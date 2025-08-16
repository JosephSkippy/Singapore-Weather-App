import { TempChart, DayRow } from "../components/TempChart";
import { useDailyWeather } from "../../weather/hooks/useDailyWeather";

export function WeatherGraphContainer({
  lat, lon, enabled,
}: { lat?: number | null; lon?: number | null; enabled: boolean }) {
  const { days, loading, error } =
    useDailyWeather(lat ?? null, lon ?? null, enabled && lat != null && lon != null);

  if (loading) return <div className="text-sm text-gray-600">Loading…</div>;
  if (error)   return <div className="text-sm text-red-600">Error: {error.message}</div>;
  if (!days || days.length === 0) return <div className="text-sm text-gray-600">No data.</div>;

  return <TempChart days={days as DayRow[]} />;
}

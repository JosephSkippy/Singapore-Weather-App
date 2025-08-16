import { useEffect, useMemo, useState } from "react";

type DailyJSON = {
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

function formatDate(d: Date) {
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

/** Fetch daily temps for [today-14d, today], given lat/lon. */
export function useDailyWeather(lat?: number, lon?: number, enabled = true) {
  const [data, setData] = useState<DailyJSON | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || lat == null || lon == null) return;

    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 14);

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&hourly=relativehumidity_2m,direct_radiation` + // harmless extra; keep or drop
      `&daily=temperature_2m_max,temperature_2m_min` +
      `&timezone=Asia%2FSingapore` +
      `&start_date=${formatDate(start)}` +
      `&end_date=${formatDate(today)}`;

    let abort = false;
    setLoading(true);
    setErr(null);

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j: DailyJSON) => !abort && setData(j))
      .catch(e => !abort && setErr(e))
      .finally(() => !abort && setLoading(false));

    return () => { abort = true; };
  }, [lat, lon, enabled]);

  const days = useMemo(() => {
    if (!data?.daily) return null;
    const { time, temperature_2m_max, temperature_2m_min } = data.daily;
    const len = Math.min(time.length, temperature_2m_max.length, temperature_2m_min.length);

    return Array.from({ length: len }, (_, i) => ({
      date: time[i],
      tmax: temperature_2m_max[i],
      tmin: temperature_2m_min[i],
    }));
  }, [data]);

  return { days, loading, error };
}

import type { OpenMeteoResponse } from "../types";

const BASE = "https://api.open-meteo.com/v1/forecast";

export async function getOpenMeteo(
  params: { lat: number; lng: number; start: string; end: string; tz?: string }
): Promise<OpenMeteoResponse> {
  const { lat, lng, start, end, tz = "Asia/Singapore" } = params;
  const qs = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    timezone: tz,
    hourly: "relativehumidity_2m,direct_radiation",
    daily: "temperature_2m_max,temperature_2m_min",
    start_date: start,
    end_date: end,
  });
  const res = await fetch(`${BASE}?${qs.toString()}`);
  if (!res.ok) throw new Error(`Open‑Meteo ${res.status}`);
  return res.json() as Promise<OpenMeteoResponse>;
}

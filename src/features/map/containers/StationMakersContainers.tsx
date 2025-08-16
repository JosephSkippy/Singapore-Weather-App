// features/map/containers/StationMarkersContainer.tsx
import { useMemo, useState } from "react";
import type { Station } from "../types";
import { useStationsAndForecasts } from "../hooks/useStation";
import { StationMarkerLayer } from "../components/StationMarkerLayer";
import { WeatherModalContainer } from "@/features/weather";

export function StationMarkersContainer() {
  const { stations, forecasts, loading } = useStationsAndForecasts();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Station | null>(null);
  const [selectedForecast, setSelectedForecast] = useState<string | null>(null);

  const byAreaForecast = useMemo(() => {
    const m = new Map<string, string>();
    for (const f of forecasts) m.set(f.area, f.forecast);
    return m;
  }, [forecasts]);

  if (loading) return null;

  const handlePopupOpen = (s: Station, e: L.LeafletEvent) => {
    setSelected(s);
    setSelectedForecast(byAreaForecast.get(s.name) ?? "No data");
    setOpen(true);
    // close leaflet popup so you don't see double UI
    (e.target as any)?.closePopup?.();
  };

  return (
    <>
      <StationMarkerLayer stations={stations} onPopupOpen={handlePopupOpen} />

      <WeatherModalContainer
        open={open}
        station={selected}
        forecastText={selectedForecast ?? undefined}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

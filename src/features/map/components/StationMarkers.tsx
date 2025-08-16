//features/map/components/StationMarkers.tsx
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useStationsAndForecasts } from "../hooks/useStation";
import { Station } from "../types";
import { WeatherModalContainer } from "@/features/weather";


export default function StationMarkers() {
  const { stations, forecasts, loading } = useStationsAndForecasts();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Station | null>(null);
  const [selectedForecast, setSelectedForecast] = useState<string | null>(null);

  if (loading) return null;

  return (
    <>
      <MarkerClusterGroup chunkedLoading>
        {stations.map((s) => {
          const forecast = forecasts.find((f) => f.area === s.name)?.forecast || "No data";

          return (
            <Marker
              key={s.id}
              position={[s.lat, s.lng] as [number, number]}
              eventHandlers={{
                popupopen: (e) => {
                  setSelected(s);
                  setSelectedForecast(forecast);
                  setOpen(true);
                  // optional: close the leaflet popup immediately to avoid double UI
                  (e.target as any)?.closePopup?.();
                },
              }}
            >
              <Popup>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>

      <WeatherModalContainer
        open={open}
        station={selected}
        forecastText={selectedForecast ?? undefined}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

// features/map/components/StationMarkerLayer.tsx
import { Marker, Popup, Tooltip  } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { Station } from "../types";

type Props = {
  stations: Station[];
  onPopupOpen: (station: Station, e: L.LeafletEvent) => void;
};

export function StationMarkerLayer({ stations, onPopupOpen }: Props) {
  return (
    <MarkerClusterGroup chunkedLoading>
      {stations.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng] as [number, number]}
          eventHandlers={{
            popupopen: (e) => onPopupOpen(s, e as unknown as L.LeafletEvent),
          }}
        >
          <Tooltip
            permanent
            direction="top"
            offset={[0, -18]}         
            className="station-label--plain"  // for custom styles
          >{s.name}
          </Tooltip>
          {/* keep Popup so popupopen fires */}
          <Popup />
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function MiniMap({ lat, lng, name }: { lat?: number | null; lng?: number | null; name?: string }) {
  if (lat == null || lng == null) {
    return <div className="grid h-40 w-full place-items-center rounded-2xl border bg-white p-4 text-sm text-gray-500 shadow-sm">No coordinates</div>;
  }
  return (
    <div className="h-40 w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
      <MapContainer center={[lat, lng]} zoom={12} className="h-full w-full" scrollWheelZoom={false} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup>{name ?? "Station"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

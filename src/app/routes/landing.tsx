// need to install npm i -D @types/leaflet for MapContainer to work. 
// thanks to https://stackoverflow.com/questions/66890855/property-center-does-not-exist-on-type-intrinsicattributes-mapcontainerprop
import { MapContainer, TileLayer } from "react-leaflet";
import {StationMarkersContainer} from "@/features/map";
import {StationSearchControl} from "@/features/search"

const Landing = () => {
  return (
    <div className="h-screen w-screen">
      <MapContainer center={[1.29, 103.85]} zoom={4} className="relative h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <StationSearchControl/>
        <StationMarkersContainer />
      </MapContainer>
    </div>
  );
};

export default Landing;
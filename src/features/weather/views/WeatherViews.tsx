import { StationSummary } from "../components/StationSummary";
import { MiniMap } from "../components/MiniMap";
import { WeatherGraphContainer } from "../containers/WeatherGraphContainer";
import {Station} from "../types"

export function WeatherViews({
  station, forecastText, open,
}: { station: Station | null; forecastText?: string; open: boolean }) {
  const lat = station?.lat, lon = station?.lng;

  return (
    <div  className="
        space-y-3 rounded-2xl p-4 shadow-lg
        border border-white/20  /* subtle glass border */
        text-white              /* white text for contrast */
      ">
      {/* top row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <StationSummary stationName={station?.name} forecastText={forecastText} />
        </div>
        <div className="md:col-span-1">
          <MiniMap lat={lat} lng={lon} name={station?.name} />
        </div>
      </div>
      {/* bottom row */}
      <WeatherGraphContainer lat={lat} lon={lon} enabled={open} />
    </div>
  );
}

import Modal from "@/components/ui/modal";
import { useDailyWeather } from "../hooks/useDailyWeather"
import { WeatherViews } from "../views/WeatherViews";
import {Station} from "../types"

export function WeatherModalContainer({
  open,
  station,
  onClose,
  forecastText,
}: {
  open: boolean;
  station: Station | null;
  onClose: () => void;
  forecastText?: string;
}) {
  const lat = station?.lat;
  const lon = station?.lng;

  // only fetch when modal is open and we have coords
  const { days, loading, error } = useDailyWeather(lat, lon, open && lat != null && lon != null);


  return (
    <Modal title={station ? `Station: ${station.name}` : ""} open={open} onClose={onClose}>
      <WeatherViews station={station} forecastText={forecastText} open={open} />
    </Modal>
  );
}

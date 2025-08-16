export function StationSummary({
  stationName,
  forecastText,
}: { stationName?: string; forecastText?: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      {stationName
      }
      {forecastText ? (
        <div className="text-sm text-gray-700">
          <div className="mb-1 font-medium">Tomorrow's Forecast</div>
          <div className="rounded border bg-gray-50 p-2">{forecastText}</div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No forecast text.</div>
      )}
    </div>
  );
}

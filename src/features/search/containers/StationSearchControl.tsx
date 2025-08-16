import { useMemo, useRef, useState } from "react";
import { useStationsAndForecasts } from "@/features/map/hooks/useStation";
import { useClickOutside } from "../hooks/useClickOutside";
import { StationSearchBox } from "../components/StationSearchBox";
import type { Station } from "@/features/weather/types";
import { useMap } from '../lib/reactLeafletAdapter';


export function StationSearchControl({
  panZoom = 14,
  position = { left: "0.75rem", top: "0.75rem" },
}: {
  panZoom?: number;
  position?: { left?: string; right?: string; top?: string; bottom?: string };
}) {
  const map = useMap();
  const { stations, loading } = useStationsAndForecasts();

  const boxRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo<Station[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return stations.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query, stations]);

  useClickOutside(boxRef, () => setOpen(false));

  const choose = (s: Station) => {
    setQuery(s.name);
    setOpen(false);
    map.flyTo([s.lat, s.lng], panZoom, { animate: true });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[activeIndex] ?? results[0]);
    }
  };

  if (loading) return null;

  return (
    <div className="absolute inset-x-0 top-3 z-[1000] pointer-events-none" style={position}>
        <div className="w-80 mx-auto pointer-events-auto">
            <StationSearchBox
                ref={boxRef}
                value={query}
                onChange={(v) => {
                setQuery(v);
                setOpen(true);
                }}
                onKeyDown={onKeyDown}
                results={results}           // Station[] (your box renders labels from s.name)
                activeIndex={activeIndex}
                onPick={choose}             // (s: Station) => void
                open={open && !!query && results.length > 0}
            />
        </div>
    </div>
  );
}

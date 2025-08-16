// features/weather/hooks/useStationSearch.ts
import { useMemo, useState, useEffect } from "react";
import type { Station } from "@/features/weather/types";

export function useStationSearch(stations: Station[], limit = 8) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return stations
      .filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, limit);
  }, [query, stations, limit]);

  // reset highlight when the result set changes
  useEffect(() => {
    setActiveIndex(0);
  }, [results.length]);

  // helpers for keyboard navigation
  const moveDown = () =>
    setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
  const moveUp = () =>
    setActiveIndex((i) =>
      results.length ? (i - 1 + results.length) % results.length : 0
    );

  return { query, setQuery, results, activeIndex, setActiveIndex, moveDown, moveUp };
}

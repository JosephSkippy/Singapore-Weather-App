// features/weather/components/StationSearchBox.tsx
import { forwardRef } from "react";
import type { Station } from "@/features/weather/types";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  results: Station[];
  activeIndex: number;
  onPick: (s: Station) => void;
  open: boolean;                 // whether to show the dropdown
  className?: string;
};

export const StationSearchBox = forwardRef<HTMLDivElement, Props>(
  ({ value, onChange, onKeyDown, results, activeIndex, onPick, open, className }, ref) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-auto relative rounded-xl bg-white/90 backdrop-blur-md  shadow-md ring-1 ring-black/10 ${className ?? ""}`}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search station…"
          className="w-full rounded-xl bg-transparent px-3 py-2 text-sm outline-none"
          aria-autocomplete="list"
          aria-expanded={open}
        />

        {open && results.length > 0 && (
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-auto rounded-xl bg-white/95 p-1 shadow-lg ring-1 ring-black/10"
          >
            {results.map((s, i) => (
              <li
                key={s.id}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={() => onPick(s)}           // mousedown prevents input blur
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                  i === activeIndex ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
StationSearchBox.displayName = "StationSearchBox";

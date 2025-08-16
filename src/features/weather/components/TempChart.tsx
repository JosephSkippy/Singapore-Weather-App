import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export type DayRow = { date: string; tmax: number; tmin: number };

export function TempChart({ days }: { days: DayRow[] }) {
  const data = days.map(d => ({ date: d.date, min: d.tmin, max: d.tmax }));
  const tickFormatter = (iso: string) => iso.slice(5);
  return (
    <div className="h-72 w-full rounded-2xl border bg-white p-3 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={tickFormatter} />
          <YAxis unit="°C" />
          <Tooltip formatter={(v: number) => [`${v}°C`, ""]} labelFormatter={(l) => `Date: ${l}`} />
          <Legend />
          <Line type="monotone" dataKey="min" dot={false} stroke="#3b82f6"/>
          <Line type="monotone" dataKey="max" dot={false} stroke="#ef4444"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

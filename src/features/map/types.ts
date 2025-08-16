export type StationId = string;

export interface Station {
  id: StationId;
  name: string;
  lat: number;
  lng: number;
  country?: string;
  meta?: Record<string, unknown>;
}
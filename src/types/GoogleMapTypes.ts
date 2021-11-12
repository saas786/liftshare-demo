export interface PositionType {
  lat: number;
  lng: number;
}

export interface MarkerType {
  position: PositionType | null;
}

export interface GoogleMapProps {
  markers: MarkerType[];
  center: { lat: number; lng: number };
  zoom: number;
}

export interface PositionType {
  text: string;
  lat: number;
  lng: number;
}

export interface MarkerType {
  position?: PositionType;
}

export interface GoogleMapProps {
  markers: MarkerType[];
  center: { lat: number; lng: number };
  zoom: number;
}

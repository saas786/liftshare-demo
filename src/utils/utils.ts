import { MarkerType } from "../types/GoogleMapTypes";

export function centerMap(
  googleMap: google.maps.Map,
  lat: number,
  lng: number
) {
  const latLng = new google.maps.LatLng(lat, lng);
  googleMap.setCenter(latLng);
}

export function fitToBounds(googleMap: google.maps.Map, markers: MarkerType[]) {
  let bounds = new google.maps.LatLngBounds();

  if (!markers) {
    return;
  }
  let startDefined = markers[0] && markers[0].position;
  let endDefined = markers[1] && markers[1].position;

  if (markers.length > 1) {
    if (startDefined && endDefined) {
      // both are defined
      for (let i = 0; i < markers.length; i++) {
        const latLng = new google.maps.LatLng(
          markers[i].position!.lat,
          markers[i].position!.lng
        );
        bounds.extend(latLng);
      }
      googleMap.fitBounds(bounds);
    } else if (endDefined) {
      // only end is defined
      centerMap(googleMap, markers[1].position!.lat, markers[1].position!.lng);
    } else if (startDefined) {
      // only start is defined
      centerMap(googleMap, markers[0].position!.lat, markers[0].position!.lng);
    }
  } else {
    if (startDefined) {
      // only start is defined
      centerMap(googleMap, markers[0].position!.lat, markers[0].position!.lng);
    }
  }
}

export const format = (date?: Date) => {
  if (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day}/${month}/${year}    ${time}`;
  }
  return "";
};

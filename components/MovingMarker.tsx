import React, { forwardRef, memo } from "react";
import { Icon } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";

const MovingMarker = forwardRef(function MovingMarker(
  { position, setPosition }: any,
  ref: any
) {
  const areEqual = (a: number, b: number) => Math.abs(a - b) < 0.00001;

  const customIcon = new Icon({
    iconUrl:
      "https://cdn-icons-png.freepik.com/256/12662/12662347.png?semt=ais_hybrid",
    iconSize: [38, 38],
  });

  useMapEvents({
    move: (e) => {
      if (ref.current) {
        const center = e.target.getCenter();
        const newCenter: [number, number] = [center.lat, center.lng];
        if (
          !areEqual(newCenter[0], position[0]) ||
          !areEqual(newCenter[1], position[1])
        ) {
          setPosition(newCenter);
        }
      }
    },
  });

  return <Marker position={position} icon={customIcon} />;
});
export default memo(MovingMarker);

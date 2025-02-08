"use client";

import React, { type FC, useEffect } from "react";
import { useMap } from "react-leaflet";

type RecenterMapProps = {
  position: [number, number];
  moveRef: React.RefObject<boolean>;
};

const RecenterMap: FC<RecenterMapProps> = ({ position, moveRef }) => {
  const map = useMap();

  useEffect(() => {
    const currentCenter = map.getCenter();
    const latDiff = Math.abs(currentCenter.lat - position[0]);
    const lngDiff = Math.abs(currentCenter.lng - position[1]);
    if (latDiff < 0.0001 && lngDiff < 0.0001) {
      return;
    }
    moveRef.current = false;
    map.flyTo(position, map.getZoom(), { animate: true, duration: 0.5 });

    const onMoveEnd = () => {
      moveRef.current = true;
    };

    map.once("moveend", onMoveEnd);

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [position, map, moveRef]);

  return null;
};

export default RecenterMap;

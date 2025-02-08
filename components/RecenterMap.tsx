"use client";

import React, { type RefObject, useEffect } from "react";
import { useMap } from "react-leaflet";

type RecenterMapProps = {
  position: [number, number];
  moveRef: RefObject<boolean>;
};

const TOLERANCE = 0.0001;

const RecenterMap = ({ position, moveRef }: RecenterMapProps) => {
  const map = useMap();

  useEffect(() => {
    const currentCenter = map.getCenter();
    const latDiff = Math.abs(currentCenter.lat - position[0]);
    const lngDiff = Math.abs(currentCenter.lng - position[1]);
    if (latDiff < TOLERANCE && lngDiff < TOLERANCE) {
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

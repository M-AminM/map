"use client";

import React, { type RefObject, useEffect } from "react";
import { useMap } from "react-leaflet";

type RecenterMapProps = {
  position: [number, number];
  moveRef: RefObject<boolean>;
};

const RecenterMap = ({ position, moveRef }: RecenterMapProps) => {
  const map = useMap();

  useEffect(() => {
    moveRef.current = false;
    map.flyTo(position, map.getZoom());
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

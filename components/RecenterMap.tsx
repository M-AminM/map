"use client";

import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ position, manualMoveRef }: any) => {
  const map = useMap();

  useEffect(() => {
    manualMoveRef.current = false;
    map.flyTo(position, map.getZoom());
    const onMoveEnd = () => {
      manualMoveRef.current = true;
    };
    map.once("moveend", onMoveEnd);
    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [position, map, manualMoveRef]);

  return null;
};
export default RecenterMap;

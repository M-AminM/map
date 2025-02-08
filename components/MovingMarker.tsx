"use client";

import React, { useMemo } from "react";
import { Icon } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import iconImage from "@/assets/images/icon.svg";

type MovingMarkerProps = {
  position: [number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
  moveRef: React.RefObject<boolean>;
};

const MovingMarker = ({
  position,
  setPosition,
  moveRef,
}: MovingMarkerProps) => {
  const areEqual = (a: number, b: number) => Math.abs(a - b) < 0.00001;

  const customIcon = useMemo(
    () =>
      new Icon({
        iconUrl: iconImage.src,
        iconSize: [30, 30],
      }),
    []
  );

  useMapEvents({
    move: (e) => {
      if (moveRef.current) {
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
};

export default MovingMarker;

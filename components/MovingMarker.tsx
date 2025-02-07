import React from "react";
import axios from "axios";
import { Icon } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";

const MovingMarker = ({ position, setPosition, manualMoveRef }: any) => {
  const areCoordsEqual = (a: number, b: number, epsilon = 1e-5) =>
    Math.abs(a - b) < epsilon;

  const customIcon = new Icon({
    iconUrl:
      "https://cdn-icons-png.freepik.com/256/12662/12662347.png?semt=ais_hybrid",
    iconSize: [38, 38],
  });

  useMapEvents({
    move: (e) => {
      if (manualMoveRef.current) {
        const center = e.target.getCenter();
        const newCenter: [number, number] = [center.lat, center.lng];
        if (
          !areCoordsEqual(newCenter[0], position[0]) ||
          !areCoordsEqual(newCenter[1], position[1])
        ) {
          setPosition(newCenter);
        }
      }
    },
    moveend: (e) => {
      if (manualMoveRef.current) {
        const { lat, lng } = e.target.getCenter();
        getData(lat, lng);
      }
    },
  });

  const getData = async (lat: number, lng: number) => {
    try {
      const response = await axios.get("/api/search/get-address", {
        params: { lat, lng },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <Marker position={position} icon={customIcon} />;
};
export default MovingMarker;

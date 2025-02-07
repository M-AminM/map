"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import axios from "axios";
import RecenterMap from "./RecenterMap";
import MovingMarker from "./MovingMarker";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [address, setAddress] = useState("");
  const [list, setList] = useState([]);
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]);
  const manualMoveRef = useRef(true);

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get("/api/search/search-address", {
          params: { address },
        })
        .then((response) => {
          setList(response.data.searches);
        });
    }, 500);

    return () => clearTimeout(getData);
  }, [address]);

  const handleSearch = (lat: number, lng: number) => {
    setPosition([lat, lng]);
  };

  return (
    <div className="w-[500px] h-[500px] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <MapContainer
        center={[35.6892, 51.389]}
        zoom={12}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer url="https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png" />
        <RecenterMap position={position} manualMoveRef={manualMoveRef} />
        <MovingMarker
          position={position}
          setPosition={setPosition}
          manualMoveRef={manualMoveRef}
        />
      </MapContainer>
      <div className="absolute top-4 left-[1rem] bg-white rounded shadow z-[1000] w-[calc(100%-2rem)]">
        <input
          type="text"
          placeholder="جستجو"
          className="p-2 border border-gray-300 rounded w-full outline-none text-sm"
          dir="rtl"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {list.map((item: any) => (
          <div key={item?.id}>
            <ul>
              <li onClick={() => handleSearch(item?.lat, item?.lng)}>
                <p>{item?.name}</p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;

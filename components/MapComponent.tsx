"use client";

import React, { useEffect, useState, useRef, type ChangeEvent } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import axios from "axios";
import RecenterMap from "./RecenterMap";
import MovingMarker from "./MovingMarker";
import "leaflet/dist/leaflet.css";
import Search from "./Search";
import Dropdown from "./Dropdown";
import Image from "next/image";
import location from "@/assets/images/location.svg";
import { List } from "@/types/list";

const MapComponent = () => {
  const [address, setAddress] = useState<string>("");
  const [list, setList] = useState<List[]>([]);
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]);
  const [isAutoOpen, setIsAutoOpen] = useState<boolean>(true);
  const moveRef = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (address) {
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
    } else setList([]);
  }, [address]);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get("/api/search/get-address", {
          params: { lat: position[0], lng: position[1] },
        })
        .then((response) => {
          console.log("API response:", response.data);
        })
        .catch((error) => console.error("API error:", error));
    }, 500);

    return () => clearTimeout(timer);
  }, [position]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsAutoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAutoOpen]);

  const handleSearch = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setList([]);
    setAddress("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setList([]);
    if (e.target.value !== "" && !isAutoOpen) setIsAutoOpen(true);
    setAddress(e.target.value);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Error: ", err);
        }
      );
    } else {
      console.error("Error");
    }
  };

  return (
    <div className="w-[500px] h-[500px] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <MapContainer
        center={[35.689648586960935, 51.38923645019532]}
        zoom={12}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer url="https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png" />
        <RecenterMap position={position} moveRef={moveRef} />
        <MovingMarker
          position={position}
          setPosition={setPosition}
          ref={moveRef}
        />
      </MapContainer>
      <div className="absolute top-4 left-[1rem] bg-white rounded shadow z-[1000] w-[calc(100%-2rem)]">
        <Search
          value={address}
          onChange={handleChange}
          placeholder="جستجو"
          type="text"
          dir="rtl"
        />
        {isAutoOpen && address.trim() !== "" && (
          <div ref={ref}>
            <Dropdown list={list} handleSearch={handleSearch} />
          </div>
        )}
      </div>
      <button
        onClick={handleGetLocation}
        className="absolute bottom-2 right-2 z-[1000] bg-white p-2 rounded shadow"
      >
        <Image src={location} alt="" width={20} height={20} />
      </button>
    </div>
  );
};

export default MapComponent;

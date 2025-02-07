"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { Icon } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Helper to compare coordinates with tolerance.
const areCoordsEqual = (a: any, b: any, epsilon = 1e-5) =>
  Math.abs(a - b) < epsilon;

// Component to recenter the map programmatically.
const RecenterMap = ({ position, manualMoveRef }: any) => {
  const map = useMap();

  useEffect(() => {
    // Disable manual updates during animation.
    manualMoveRef.current = false;

    // Fly to the new position.
    map.flyTo(position, map.getZoom());

    // Use the map's moveend event to re-enable manual events once done.
    const onMoveEnd = () => {
      manualMoveRef.current = true;
    };

    // Listen for the next moveend.
    map.once("moveend", onMoveEnd);

    // Cleanup if the effect re-runs.
    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [position, map, manualMoveRef]);

  return null;
};

// Component that displays the marker and listens for map movements.
const MovingMarker = ({ position, setPosition, manualMoveRef }: any) => {
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
        // Only update if there's a significant change.
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

  // Function to call your API.
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

const MapComponent = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [list, setList] = useState([]);
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]);
  // Ref to track whether movement is manual or programmatic.
  const manualMoveRef = useRef(true);

  // Debounce query input.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Search API call.
  const getDataForSearch = async () => {
    try {
      const response = await axios.get("/api/search/search-address", {
        params: { address: debouncedQuery },
      });
      setList(response.data.searches);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      getDataForSearch();
    }
  }, [debouncedQuery]);

  // When a search result is clicked, update the marker's position.
  const handleSearch = (lat: number, lng: number) => {
    setPosition([lat, lng]);
  };

  return (
    <div className="w-[500px] h-[500px] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <MapContainer
        center={[35.6892, 51.389]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          url="https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href='https://snappmaps.ir/'>SnappMaps</a> contributors"
        />
        {/* Recenter the map when the position changes */}
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

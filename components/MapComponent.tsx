"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { useState } from "react";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MovingMarker = () => {
  const map = useMap();
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]);
  const customIcon = new Icon({
    iconUrl:
      "https://cdn-icons-png.freepik.com/256/12662/12662347.png?semt=ais_hybrid",
    iconSize: [38, 38],
  });

  useMapEvents({
    move: (e) => {
      setPosition([e.target.getCenter().lat, e.target.getCenter().lng]);
    },
    moveend: (e) => {
      // When the map stops moving, log the map details.
      handleGetData();
    },
  });

  const getData = async (lat: number, lng: number) => {
    const response = await axios.get("/api/search/get-address", {
      params: {
        lat,
        lng,
      },
    });
    console.log(response.data);

    // const data = await response.json();
    // console.log(data);
  };

  const handleGetData = () => {
    // const bounds = map.getBounds();
    const { lat, lng } = map.getCenter();
    getData(lat, lng);
    // const zoom = map.getZoom();
    // console.log(center);
    // console.log(bounds);
  };

  return (
    <>
      <Marker position={position} icon={customIcon} />
    </>
  );
};

const MapComponent = () => {
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
        <MovingMarker />
      </MapContainer>
      <div className="absolute top-4 left-[1rem] bg-white rounded shadow z-[1000] w-[calc(100%-2rem)]">
        <input
          type="text"
          placeholder="جستجو"
          className="p-2 border border-gray-300 rounded w-full outline-none text-sm"
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default MapComponent;

// "use client";

// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const customIcon = new L.Icon({
//   iconUrl:
//     "https://cdn-icons-png.freepik.com/256/12662/12662347.png?semt=ais_hybrid", // Update with your custom marker image path
//   iconSize: [32, 32], // Adjust size as needed
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const MovingMarker = () => {
//   const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]);
//   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

//   useMapEvents({
//     move: (e) => {
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//       const newTimeoutId = setTimeout(() => {
//         setPosition([e.target.getCenter().lat, e.target.getCenter().lng]);
//       }, 100);
//       setTimeoutId(newTimeoutId);
//     },
//   });

//   return <Marker position={position} icon={customIcon} />;
// };

// const MapComponent = () => {
//   return (
//     <MapContainer
//       center={[35.6892, 51.389]} // Centered on Tehran
//       zoom={12}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png"
//         attribution="&copy; <a href='https://snappmaps.ir/'>SnappMaps</a> contributors"
//       />
//       <MovingMarker />
//     </MapContainer>
//   );
// };

// export default MapComponent;

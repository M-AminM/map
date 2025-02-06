"use client";

import { useEffect, useRef, useState } from "react";

const TILE_SIZE = 256; // Standard tile size for maps
const INITIAL_ZOOM = 3; // Initial zoom level
const MAP_CENTER = { lat: 35.6892, lon: 51.389 }; // Center map (Tehran as an example)

const lonToX = (lon: number, zoom: number) =>
  Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
const latToY = (lat: number, zoom: number) => {
  const rad = (lat * Math.PI) / 180;
  return Math.floor(
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) *
      Math.pow(2, zoom)
  );
};

const TileMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const renderTiles = () => {
    if (!mapRef.current) return;

    const mapDiv = mapRef.current;
    mapDiv.innerHTML = ""; // Clear previous tiles

    const tileCount = Math.pow(2, zoom);
    const centerX = lonToX(MAP_CENTER.lon, zoom);
    const centerY = latToY(MAP_CENTER.lat, zoom);

    const tilesPerRow = Math.ceil(mapDiv.clientWidth / TILE_SIZE);
    const tilesPerCol = Math.ceil(mapDiv.clientHeight / TILE_SIZE);

    for (let dx = -tilesPerRow; dx < tilesPerRow; dx++) {
      for (let dy = -tilesPerCol; dy < tilesPerCol; dy++) {
        const x = centerX + dx;
        const y = centerY + dy;

        if (x >= 0 && x < tileCount && y >= 0 && y < tileCount) {
          const tileUrl = `https://raster.snappmaps.ir/styles/snapp-style/${zoom}/${x}/${y}.png`;

          const tile = document.createElement("img");
          tile.src = tileUrl;
          tile.style.position = "absolute";
          tile.style.left = `${(dx + tilesPerRow) * TILE_SIZE + offset.x}px`;
          tile.style.top = `${(dy + tilesPerCol) * TILE_SIZE + offset.y}px`;
          tile.style.width = `${TILE_SIZE}px`;
          tile.style.height = `${TILE_SIZE}px`;

          mapDiv.appendChild(tile);
        }
      }
    }
  };

  useEffect(() => {
    renderTiles();
  }, [zoom, offset]);

  const handleZoom = (event: WheelEvent) => {
    event.preventDefault();
    setZoom((prev) =>
      Math.max(1, Math.min(prev + (event.deltaY > 0 ? -1 : 1), 18))
    );
  };

  const handleDrag = (event: MouseEvent) => {
    if (event.buttons !== 1) return;
    setOffset((prev) => ({
      x: prev.x + event.movementX,
      y: prev.y + event.movementY,
    }));
  };

  useEffect(() => {
    const mapDiv = mapRef.current;
    if (!mapDiv) return;

    mapDiv.addEventListener("wheel", handleZoom as EventListener);
    mapDiv.addEventListener("mousemove", handleDrag as EventListener);

    return () => {
      mapDiv.removeEventListener("wheel", handleZoom as EventListener);
      mapDiv.removeEventListener("mousemove", handleDrag as EventListener);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#ddd",
        cursor: "grab",
      }}
    />
  );
};

export default TileMap;

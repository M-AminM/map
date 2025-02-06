"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <MapComponent />
      {/* <ZoomControls /> */}
    </div>
  );
}

// import TileMap from "@/components/TileMap";

// export default function Home() {
//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <TileMap />
//     </div>
//   );
// }

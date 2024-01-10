import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Condition from "./Condition";

function MyMapComponent() {
  // coordenadas de Arequipa
  const [windowOpen, setWindowOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>({ lat: -16.39889, lng: -71.535 });
  const [change, setChange] = useState<boolean>(false);

  const handleClick = (event) => {
    setChange(!change);
    setPosition(event.detail.latLng);
  };

  return (
    <>
      <APIProvider apiKey="AIzaSyDjD6k1FPCpGAVPO3GGTTWyN9rITWh3UAY">
        <div style={{ height: "50vh", width: "100%" }}>
          <Map zoom={14} center={position} onClick={handleClick}>
            {windowOpen && position && (
              <InfoWindow position={position} onCloseClick={() => setWindowOpen(false)}>
                <h1>Info Window</h1>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
      <Condition currentLngLat={position} change={change} setChange={setChange} />
    </>
  );
}
export default MyMapComponent;

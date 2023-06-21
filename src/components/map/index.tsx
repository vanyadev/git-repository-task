import React, { useState } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

interface MapComponentProps {
  location: string | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  const center = {
    lat: 51.5074,
    lng: -0.1278,
  };

  if (location === null) {
    return (
      <div className="h-screen flex justify-center items-center">
        Location not specified
      </div>
    );
  }

  return (
    <div className="h-screen">
      <LoadScriptNext googleMapsApiKey="">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "70%",
          }}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default MapComponent;

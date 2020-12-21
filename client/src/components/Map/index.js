import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import "./Map.scss";

const LocationPin = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 15px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
      fontSize: "0.5rem",
    }}
    className="pin"
  >
    <p className="pin-text">{text}</p>
  </div>
);

const Map = ({ location, zoomLevel, google }) => {
  return (
    <div style={{ height: "400px", width: "100%" }} className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDicHU4YPo2_9PkvMFM3uvlU6R5FvWlRDg" }}
        defaultCenter={{
          lat: -33.8178381,
          lng: 151.0028019,
        }}
        defaultZoom={zoomLevel || 15}
        google={google}
        center={{ lat: location.lat, lng: location.lng }}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.name}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;

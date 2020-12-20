import React from "react";
import GoogleMapReact from "google-maps-react";
import "./Map.scss";

const Map = ({ location, zoomLevel, google }) => {
  return (
    <div style={{ height: "400px", width: "400px" }} className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDicHU4YPo2_9PkvMFM3uvlU6R5FvWlRDg" }}
        defaultCenter={location}
        defaultZoom={zoomLevel || 10}
        google={google}
      >
        {/* <LocationPin lat={location.lat} lng={location.lng} /> */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

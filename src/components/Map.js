import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import SearchField from "./SearchField";
import { Button } from "@mui/material";
import { VerticalAlignBottom } from "@mui/icons-material";

const AddMarker = () => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: (e) => {
      setPosition(e.latlng); // 👈 add marker

      /* CODE TO ADD NEW PLACE TO STORE (check the source code) */
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

export default function Map() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [addCourtFlag, setAddCourtFlag] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      setAddCourtFlag(false); //TODO : REMOVE
    });
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function savePosition(position) {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

  return (
    <>
      <div>
        <Button onClick={getLocation}>Get location</Button>
      </div>
      {lat && (
        <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
          <TileLayer url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a73bc6859bf49d089f11fef85911536" />
          <SearchField />
          {addCourtFlag && <AddMarker />}
          <Marker position={[lat, lon]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

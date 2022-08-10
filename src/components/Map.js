import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import SearchField from "./SearchField";

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
      setAddCourtFlag(false); //TODO : REMOVE
    });
  }, []);

  return (
    <>
      {lon && (
        <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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

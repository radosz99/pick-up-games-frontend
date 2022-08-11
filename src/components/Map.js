import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import SearchField from "./SearchField";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

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

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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
      <MapContainer center={[12, 45]} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a73bc6859bf49d089f11fef85911536" />
        <SearchField />
        {addCourtFlag && <AddMarker />}
        <Marker position={[12, 45]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

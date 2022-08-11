import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import React, { useState } from "react";
import SearchField from "./SearchField";
import { Button } from "@mui/material";
import Control from "react-leaflet-custom-control";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Map({ handleOpenAddCourtModal }) {
  // const [lat, setLat] = useState(null);
  // const [lon, setLon] = useState(null);
  const [markers, setMarkers] = useState([[0, 0]]);
  const [addCourtFlag, setAddCourtFlag] = useState(false);

  const AddMarker = () => {
    const [position, setPosition] = useState(null);

    useMapEvents({
      click: (e) => {
        setPosition(e.latlng); // 👈 add marker
        /* CODE TO ADD NEW PLACE TO STORE (check the source code) */
        setMarkers([...markers, [e.latlng.lat, e.latlng.lng]]);
        setAddCourtFlag(false);
        handleOpenAddCourtModal();
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <MapContainer
      center={[51.109175, 17.032684]}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a73bc6859bf49d089f11fef85911536" />
      <ZoomControl position={"bottomleft"} />
      <SearchField />
      <Control prepend position="topleft">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            setAddCourtFlag(!addCourtFlag);
          }}
          sx={{ mt: 5, ml: 5 }}
        >
          Add court
        </Button>
        <Box
          sx={{
            backgroundColor: "#E3F2FD",
            p: 2,
            mt: 40,
            border: 15,
            borderColor: "#E3F2FD",
            borderRadius: 10,
          }}
        >
          <Box>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Outdoor"
            />
            <br />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Indoor"
            />
          </Box>
          <Box sx={{ mt: 5 }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="With players today"
            />
            <br />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="With photos"
            />
            <br />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Highly rated"
            />
          </Box>
        </Box>
      </Control>
      {addCourtFlag && <AddMarker />}
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            <span>This will be court description.</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

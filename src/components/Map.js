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
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function Map() {
  const { appStore } = useStore();

  const AddMarker = () => {
    const [position, setPosition] = useState(null);

    useMapEvents({
      click: (e) => {
        setPosition(e.latlng); // 👈 add marker
        appStore.setNewCourtcoordinates(e.latlng);
        appStore.setAddCourtFlag(false);
        appStore.setAddCourtModalOpen(true);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <MapContainer
      center={appStore.coordinates}
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
          disabled={appStore.addCourtFlag}
          size="large"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            appStore.setAddCourtFlag(true);
          }}
          sx={{ mt: 5, ml: 5 }}
        >
          Add court
        </Button>
        <Box
          sx={{
            backgroundColor: "#E3F2FD",
            p: 2,
            mt: 10,
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
      {appStore.addCourtFlag && <AddMarker />}
      {appStore.courtsMarkers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            <span>This will be court description.</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default observer(Map);

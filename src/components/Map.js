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
import { Button, Typography } from "@mui/material";
import Control from "react-leaflet-custom-control";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useTheme } from "@mui/material/styles";
import { useRef, useEffect } from "react";
import Switch from "@mui/material/Switch";

function Map() {
  const { appStore } = useStore();
  const theme = useTheme();

  const ref = useRef(null);
  const sateliteMapUrl = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
  const mapUrl =
    "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a73bc6859bf49d089f11fef85911536";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        appStore.setCoordinates([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      function (error) {
        appStore.setCoordinates([51.109175, 17.032684]); // Wrocław coordinates
      }
    );

    if (ref.current) {
      ref.current.setUrl(appStore.sateliteView ? sateliteMapUrl : mapUrl);
    }
  }, [appStore.sateliteView, appStore]);

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

    return position === null ? null : (
      <Marker draggable={true} position={position}></Marker>
    );
  };

  return (
    <>
      {appStore.coordinates.length > 0 && (
        <MapContainer
          center={appStore.coordinates}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <TileLayer
            ref={ref}
            url={appStore.sateliteView ? sateliteMapUrl : mapUrl}
            subdomains={["mt1", "mt2", "mt3"]}
          />
          <ZoomControl position={"bottomleft"} />
          <SearchField />
          <Control>
            <FormControlLabel
              control={
                <Switch
                  color="warning"
                  checked={appStore.sateliteView}
                  onChange={(e) => {
                    appStore.setSateliteView(e.target.checked);
                  }}
                />
              }
              label={<Typography variant="h3">Satellite</Typography>}
            />
          </Control>
          <Control prepend position="topleft">
            <Button
              variant="contained"
              disabled={appStore.addCourtFlag}
              size="large"
              color="primary"
              onClick={(e) => {
                appStore.setSateliteView(true);
                e.stopPropagation();
                appStore.setAddCourtFlag(true);
                var element =
                  document.getElementsByClassName("leaflet-container")[0];
                element.classList.add("cursor");
              }}
              sx={{ mt: 5, ml: 5, fontSize: 24 }}
            >
              Add court
            </Button>
            <Box
              sx={{
                backgroundColor: theme.palette.secondary.main,
                p: 1,
                mt: 10,
                border: 15,
                borderColor: theme.palette.secondary.main,
                borderRadius: 10,
              }}
            >
              <Box>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={<Typography variant="p">Outdoor</Typography>}
                />
                <br />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={<Typography variant="p">Indoor</Typography>}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <Typography variant="p">With players today</Typography>
                  }
                />
                <br />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={<Typography variant="p">With photos</Typography>}
                />
                <br />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={<Typography variant="p">Highly rated</Typography>}
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
      )}
    </>
  );
}

export default observer(Map);

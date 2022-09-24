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
import { Button, Typography, Grid } from "@mui/material";
import Control from "react-leaflet-custom-control";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useTheme } from "@mui/material/styles";
import { useRef, useEffect } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useMap } from "react-leaflet/hooks";
import * as L from "leaflet";

const LeafIcon = L.Icon.extend({
  options: {},
});

const greenIcon = new LeafIcon({
  iconUrl:
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
});

function Map() {
  const { appStore } = useStore();
  const theme = useTheme();
  const [searchBarEnabled, setSearchBarEnabled] = useState(false);

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
        appStore.setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setSearchBarEnabled(true);
      },
      function (error) {
        setSearchBarEnabled(true);
        // appStore.setCoordinates([51.109175, 17.032684]); // Wrocław coordinates
      }
    );
  }, [appStore]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(appStore.sateliteView ? sateliteMapUrl : mapUrl);
    }
  }, [appStore, appStore.sateliteView]);

  const AddMarker = () => {
    const [position, setPosition] = useState(null);

    useMapEvents({
      click: (e) => {
        const baseUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2`;
        try {
          axios
            .get(`${baseUrl}`, {
              params: {
                lat: e.latlng.lat,
                lon: e.latlng.lng,
                zoom: 18,
                addressdetails: 1,
              },
            })
            .then((response) => {
              let city =
                response.data.address.city ?? response.data.address.village;
              let road = response.data.address.road;
              let country = response.data.address.country;
              let postCode = response.data.address.postcode;
              appStore.setNewCourtShortInfo({
                city: city,
                road: road,
                country: country,
                postCode: postCode,
                street_name: "",
                street_number: "",
              });
              setPosition(e.latlng); // 👈 add marker
              appStore.setNewCourtcoordinates(e.latlng);
              appStore.setAddCourtFlag(false);
              appStore.setAddCourtModalOpen(true);
            });
        } catch (error) {
          console.log(error);
        }
      },
    });

    return position === null ? (
      position
    ) : (
      <Marker draggable={true} position={position}></Marker>
    );
  };

  function ChangeView({ center, zoom }) {
    const map = useMap();
    if (!appStore.coordinatesSet) {
      map.setView(center, zoom);
    }
    map.on("move", () => appStore.setCoordinatesSet(true));

    return null;
  }

  function LocationMarker() {
    const map = useMapEvents({
      click() {},
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return (
      <>
        <Control>
          <Button
            variant="contained"
            disabled={appStore.addCourtFlag}
            size="large"
            color="primary"
            onClick={(e) => {
              map.locate();
            }}
            sx={{ mt: 5, ml: 5, fontSize: 24 }}
          >
            Localize me
          </Button>
        </Control>
      </>
    );
  }

  return (
    <MapContainer
      center={appStore.coordinates}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <ChangeView center={appStore.coordinates} zoom={13} />
      <TileLayer
        ref={ref}
        url={appStore.sateliteView ? sateliteMapUrl : mapUrl}
        subdomains={["mt1", "mt2", "mt3"]}
      />
      <ZoomControl position={"bottomleft"} />
      {searchBarEnabled && <SearchField />}
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
            // e.stopPropagation();
            appStore.setAddCourtFlag(true);
            appStore.setCoordinatesSet(true);
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
              label={<Typography variant="p">With players today</Typography>}
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
      {appStore.currentLocation && (
        <Marker icon={greenIcon} key={1} position={appStore.currentLocation}>
          <Popup>
            <p>You are here</p>
          </Popup>
        </Marker>
      )}
      {appStore.addCourtFlag && <AddMarker />}
      {appStore.courts.map((court, idx) => (
        <Marker
          key={`marker-${court.id}`}
          position={[court.address.latitude, court.address.longitude]}
        >
          <Popup>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <span>{court.name}</span>
              <span>
                {court.address.street_name +
                  " " +
                  court.address.city +
                  " " +
                  court.address.street_number}
              </span>
              <Button
                sx={{ color: "red", fontSize: 14 }}
                onClick={() => {
                  appStore.setCourtModalOpen(true);
                  appStore.setSelectedCourt(court);
                }}
              >
                See court details
              </Button>
            </Grid>
          </Popup>
        </Marker>
      ))}
      <LocationMarker />
    </MapContainer>
  );
}

export default observer(Map);

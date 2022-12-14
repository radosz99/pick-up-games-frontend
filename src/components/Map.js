import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import "../styles.css";
import React, { useState } from "react";
import SearchField from "./SearchField";
import { Button, Typography, Grid } from "@mui/material";
import Control from "react-leaflet-custom-control";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useRef, useEffect } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useMap } from "react-leaflet/hooks";
import * as L from "leaflet";
import { useCallback } from "react";
import CourtsFilters from "./CourtsFilters";
import MarkerClusterGroup from "react-leaflet-cluster";

const LeafIcon = L.Icon.extend({
  options: {
    iconAnchor: [17, 46],
  },
});

const greenIcon = new LeafIcon({
  iconUrl:
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
});

const defaultIcon = new LeafIcon({
  iconUrl: "https://unpkg.com/leaflet@1.9.1/dist/images/marker-icon.png",
});

const DisplayPosition = observer(({ map }) => {
  const { appStore } = useStore();

  const onMove = useCallback(() => {
    let current_coords = map.getCenter();
    appStore.setCoordinates([current_coords.lat, current_coords.lng]);
    appStore.setCourtsDistance([current_coords.lat, current_coords.lng]);
  }, [map, appStore]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(function (position) {
          appStore.setCoordinates([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          appStore.setCurrentLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);

          map.closePopup();

          map.flyTo(
            { lat: position.coords.latitude, lon: position.coords.longitude },
            map.getZoom()
          );
        });
      }}
      sx={{
        mt: 5,
        ml: 5,
        fontSize: 24,
        position: "absolute",
        top: 160,
        left: 10,
        display:
          appStore.addCourtModalOpen || appStore.courtModalOpen
            ? "none"
            : "block",
        zIndex: 9999999,
      }}
    >
      Localize me
    </Button>
  );
});

function Map() {
  const { appStore } = useStore();
  const [searchBarEnabled, setSearchBarEnabled] = useState(false);
  const [map, setMap] = useState(null);

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
              setPosition(e.latlng); // ???? add marker
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
    map.on("move", (e) => {
      appStore.setCoordinatesSet(true);
    });

    return null;
  }

  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      <MapContainer
        center={appStore.coordinates}
        zoom={13}
        minZoom={8}
        zoomControl={false}
        scrollWheelZoom={true}
        ref={setMap}
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
          <CourtsFilters />
        </Control>
        {appStore.currentLocation && (
          <Marker icon={greenIcon} position={appStore.currentLocation}>
            <Popup className="user_location_popup">
              <span>You are here</span>
            </Popup>
          </Marker>
        )}
        {appStore.addCourtFlag && <AddMarker />}
        <MarkerClusterGroup chunkedLoading>
          {appStore.courts.map((court, idx) => (
            <Marker
              title={court.details.name}
              key={`marker-${court.id}`}
              icon={defaultIcon}
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
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default observer(Map);

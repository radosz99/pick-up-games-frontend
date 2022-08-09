import Header from "./ui/Header";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./ui/Theme";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles.css";

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  });

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Box
            sx={{
              width: 700,
              maxWidth: "100%",
            }}
          >
            <TextField
              id="fullWidth"
              fullWidth
              placeholder="Find your new match"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            width: "100vw",
          }}
        >
          {lat !== null && (
            <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lon]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: 100,
              backgroundColor: "primary.light",
            }}
          >
            <Grid
              item
              sx={{
                mx: 5,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <SearchIcon sx={{ fontSize: "60px", mr: 2 }} />
              <Typography variant="h2" sx={{ color: "white" }}>
                FIND COURTS
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                mx: 5,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <GroupsIcon sx={{ fontSize: "60px", mr: 2 }} />
              <Typography variant="h2" sx={{ color: "white" }}>
                FIND TEAMMATES
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                mx: 5,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <SportsKabaddiIcon sx={{ fontSize: "60px", mr: 2 }} />
              <Typography variant="h2" sx={{ color: "white" }}>
                PLAY GAME
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;

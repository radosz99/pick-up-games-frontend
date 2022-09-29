import Header from "./ui/Header";
import React, { useEffect } from "react";
import theme from "./ui/Theme";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, GlobalStyles } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import Map from "./Map";
import NewCourtModal from "./NewCourtModal";
import CourtDetailsModal from "./courtDetails/CourtDetailsModal";
import { observer } from "mobx-react-lite";
import PersistentDrawerRight from "./ui/PersistentDrawerRight";
import { useStore } from "../stores/store";
import axios from "axios";
import { getDistanceBetweenTwoPoints } from "../constants/utils";
import { ToastContainer } from "react-toastify";

function Matcher() {
  const { appStore } = useStore();

  useEffect(() => {
    axios.get(`https://backend.matcher.pl/api/v1/court/`).then((response) => {
      let courts = response.data.results;
      courts.forEach((court) => {
        court.distanceFromCurrentLocation = getDistanceBetweenTwoPoints(
          {
            latitude: court.address.latitude,
            longitude: court.address.longitude,
          },
          {
            latitude: appStore.currentLocation[0],
            longitude: appStore.currentLocation[1],
          }
        );
      });

      courts.sort(
        (a, b) =>
          parseInt(a.distanceFromCurrentLocation) -
          parseInt(b.distanceFromCurrentLocation)
      );

      appStore.setCourts(courts);
    });
  }, [appStore]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <NewCourtModal />
      <CourtDetailsModal />
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.background.default },
        }}
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          sx={{
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <Map />
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
              <SearchIcon sx={{ fontSize: "40px", mr: 2 }} />
              <Typography variant="h3" sx={{ color: "white" }}>
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
              <GroupsIcon sx={{ fontSize: "40px", mr: 2 }} />
              <Typography variant="h3" sx={{ color: "white" }}>
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
              <SportsKabaddiIcon sx={{ fontSize: "40px", mr: 2 }} />
              <Typography variant="h3" sx={{ color: "white" }}>
                PLAY GAME
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PersistentDrawerRight />
    </>
  );
}

export default observer(Matcher);

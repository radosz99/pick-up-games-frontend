import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { useStore } from "../stores/store";
import { useTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { getDistanceBetweenTwoPoints } from "../constants/utils";

function CourtFilters() {
  const { appStore } = useStore();
  const theme = useTheme();

  const resetFiltersHandler = async () => {
    appStore.resetFilters();
    await axios
      .get(`https://backend.matcher.pl/api/v1/court/`)
      .then((response) => {
        let courts = response.data;

        courts.forEach((court) => {
          court.distanceFromCurrentLocation = getDistanceBetweenTwoPoints(
            {
              latitude: court.address.latitude,
              longitude: court.address.longitude,
            },
            {
              latitude: appStore.coordinates[0],
              longitude: appStore.coordinates[1],
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
  };

  const filterHandle = async () => {
    await axios
      .get(`https://backend.matcher.pl/api/v1/court/`)
      .then((response) => {
        let courts = response.data;

        courts.forEach((court) => {
          court.distanceFromCurrentLocation = getDistanceBetweenTwoPoints(
            {
              latitude: court.address.latitude,
              longitude: court.address.longitude,
            },
            {
              latitude: appStore.coordinates[0],
              longitude: appStore.coordinates[1],
            }
          );
        });

        courts.sort(
          (a, b) =>
            parseInt(a.distanceFromCurrentLocation) -
            parseInt(b.distanceFromCurrentLocation)
        );

        appStore.setCourts(courts);
      })
      .finally(() => {
        appStore.filterCourts();
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        p: 1,
        mt: 10,
        ml: 3,
        border: 15,
        borderColor: theme.palette.secondary.main,
        borderRadius: 10,
      }}
    >
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              value={appStore.outdoor_filters}
              checked={appStore.outdoor_filters}
              onChange={(e) => appStore.setOutdoorFilters(e.target.checked)}
            />
          }
          label={<Typography variant="p">Outdoor</Typography>}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              value={appStore.indoor_filters}
              checked={appStore.indoor_filters}
              onChange={(e) => appStore.setIndoorFilters(e.target.checked)}
            />
          }
          label={<Typography variant="p">Indoor</Typography>}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              value={appStore.playersToday_filters}
              checked={appStore.playersToday_filters}
              onChange={(e) =>
                appStore.setPlayersTodayFilters(e.target.checked)
              }
            />
          }
          label={<Typography variant="p">With players today</Typography>}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              value={appStore.photos_filters}
              checked={appStore.photos_filters}
              onChange={(e) => appStore.setPhotosFilters(e.target.checked)}
            />
          }
          label={<Typography variant="p">With photos</Typography>}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              value={appStore.rated_filters}
              checked={appStore.rated_filters}
              onChange={(e) => appStore.setRatedFilters(e.target.checked)}
            />
          }
          label={<Typography variant="p">Highly rated</Typography>}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={resetFiltersHandler}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ ml: 5 }}
          onClick={(e) => {
            filterHandle();
          }}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
}

export default observer(CourtFilters);

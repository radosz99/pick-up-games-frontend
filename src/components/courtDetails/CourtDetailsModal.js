import Box from "@mui/material/Box";
import { Typography, Modal, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import NavigationIcon from "@mui/icons-material/Navigation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useTheme } from "@mui/material/styles";
import WeatherComponent from "./WeatherComponent";
import TimelineSliderComponent from "./TimelineSliderComponent";
import CourtDetailsIconsWithCarusel from "./CourtDetailsIconsWithCarusel";
import { numFormatter } from "../../constants/utils";
import axios from "axios";
import TimelinePlayersOnCourt from "./TimelinePlayersOnCourt";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: 700,
  bgcolor: "#D9D9D9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CourtDetailsModal() {
  const { appStore } = useStore();
  const theme = useTheme();

  const ratingChangedHanlder = async (value) => {
    await axios
      .post(`https://backend.matcher.pl/api/v1/rating/`, {
        court: appStore.selectedCourt.id,
        stars: value,
      })
      .then(() => {
        appStore.selectedCourt.rating =
          (appStore.selectedCourt.rating *
            appStore.selectedCourt.ratings_number +
            value) /
          (appStore.selectedCourt.ratings_number + 1);
        appStore.selectedCourt.ratings_number += 1;
        toast.success("Thanks for your opinion!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("You've already rated this court!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  //todo: handle other days than today
  const handleSubmit = async () => {
    let minutes = 0;
    let today = new Date();
    let chosenDay = new Date();

    chosenDay.setDate(today.getDate() + appStore.selectedDay);

    appStore.hoursRange[0] % 1 !== 0 ? (minutes = 30) : (minutes = 0);
    let start = chosenDay.setHours(appStore.hoursRange[0], minutes, 0, 0);

    appStore.hoursRange[1] % 1 !== 0 ? (minutes = 30) : (minutes = 0);
    let end = chosenDay.setHours(appStore.hoursRange[1], minutes, 0, 0);

    let model = {
      player_nick: "testing",
      start: start / 1000,
      end: end / 1000,
      court: appStore.selectedCourt.id,
    };

    await axios
      .post(`https://backend.matcher.pl/api/v1/timeframe/`, model)
      .then((response) => {
        console.log(response.data);
      })
      .finally(() => {
        let start_hour =
          new Date().setHours(appStore.currentHour, 0, 0, 0) / 1000;
        let end_hour = new Date().setHours(23, 30, 0, 0) / 1000;

        axios
          .get(
            `https://backend.matcher.pl/api/v1/court/${appStore.selectedCourt.id}/timeframes/?start=${start_hour}&end=${end_hour}`
          )
          .then((response) => {
            var dict = {};
            for (const [key, value] of Object.entries(response.data)) {
              let date = new Date(key + " GMT"); // to GMT 0 conversion
              if (date.getHours() === 23 && date.getMinutes() === 30) {
                // due to api not working correctly
                break;
              }
              dict[date] = value;
            }
            appStore.setSelectedCourtTimeframes(dict);
          });
      });
  };

  return (
    <Modal
      open={appStore.courtModalOpen}
      onClose={() => appStore.setCourtModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          onClick={() => appStore.setCourtModalOpen(false)}
          sx={{ position: "absolute", right: 30, cursor: "pointer" }}
        >
          <CloseIcon />
        </Box>

        <Typography variant="h2" align="center">
          {appStore.selectedCourt ? appStore.selectedCourt.name : "COURT NAME"}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Grid item xs={1}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 100,
                textAlign: "center",
              }}
            >
              <Typography variant="p">
                {appStore.selectedCourt
                  ? appStore.selectedCourt.details.type
                  : "Court type"}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              onChange={(event, newValue) => {
                ratingChangedHanlder(newValue);
              }}
              value={appStore.selectedCourt ? appStore.selectedCourt.rating : 0}
            />
            <Typography variant="p" component="legend">
              {appStore.selectedCourt
                ? appStore.selectedCourt.ratings_number
                : 0}{" "}
              ratings
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <PeopleAltIcon sx={{ mr: 1 }} />
            <Typography variant="p">
              {appStore.selectedCourt
                ? appStore.selectedCourt.actual_players_number +
                  " players in here"
                : "Players amount"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <NavigationIcon sx={{ mr: 1 }} />
            <Typography variant="p">
              {appStore.selectedCourt
                ? appStore.selectedCourt.address.street_name +
                  " " +
                  appStore.selectedCourt.address.city +
                  " " +
                  appStore.selectedCourt.address.street_number +
                  " " +
                  appStore.selectedCourt.address.postal_code +
                  ", " +
                  appStore.selectedCourt.address.country
                : "ADDRESS"}
            </Typography>
          </Grid>
        </Grid>
        <CourtDetailsIconsWithCarusel />
        <TimelineSliderComponent />
        <TimelinePlayersOnCourt />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "50vw" }}
              onClick={handleSubmit}
            >
              I'll be on the court from {numFormatter(appStore.hoursRange[0])}{" "}
              to {numFormatter(appStore.hoursRange[1])}
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <WeatherComponent />
        </Grid>
      </Box>
    </Modal>
  );
}

export default observer(CourtDetailsModal);

import Box from "@mui/material/Box";
import { Typography, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import NavigationIcon from "@mui/icons-material/Navigation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import WeatherComponent from "./WeatherComponent";
import TimelineSliderComponent from "./TimelineSliderComponent";
import CourtDetailsIconsWithCarusel from "./CourtDetailsIconsWithCarusel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "#D9D9D9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CourtDetailsModal() {
  const { appStore } = useStore();
  const theme = useTheme();

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
          COURT NAME
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Grid item xs={1}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 100,
                textAlign: "center",
              }}
            >
              <Typography variant="p">OUTDOOR</Typography>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating name="read-only" value={4} readOnly />
            <Typography variant="p" component="legend">
              2 ratings
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
            <Typography variant="p">2 PLAYERS IN HERE</Typography>
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
              Andrzeja Modrzewskiego-Frycza 12 Wroclaw 50-155, Poland
            </Typography>
          </Grid>
        </Grid>
        <CourtDetailsIconsWithCarusel />
        <TimelineSliderComponent />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <WeatherComponent />
        </Grid>
      </Box>
    </Modal>
  );
}

export default observer(CourtDetailsModal);

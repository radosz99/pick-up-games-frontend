import Box from "@mui/material/Box";
import { Typography, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import NavigationIcon from "@mui/icons-material/Navigation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Carousel from "react-material-ui-carousel";
import { Icon } from "@iconify/react";

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

var items = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1602357280104-742c517a1d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1600534220378-df36338afc40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
  },
];

function Item(props) {
  return <img height={200} alt="court" src={props.item.imgUrl} />;
}

function CourtDetailsModal() {
  const { appStore } = useStore();

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

        <Typography variant="h3" align="center">
          COURT NAME
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Grid item xs={2}>
            <Box>
              <Typography>OUTDOOR</Typography>
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
            <Typography component="legend">2 ratings</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <PeopleAltIcon sx={{ mr: 1 }} />
            <Typography>2</Typography>
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
            <Typography>
              Andrzeja Modrzewskiego-Frycza 12 Wroclaw 50-155, Poland
            </Typography>
          </Grid>
        </Grid>
        <Carousel
          sx={{ textAlign: "center", mt: 5 }}
          navButtonsAlwaysVisible={true}
          next={(next, active) =>
            console.log(`we left ${active}, and are now at ${next}`)
          }
          prev={(prev, active) =>
            console.log(`we left ${active}, and are now at ${prev}`)
          }
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon icon="icon-park:court" rotate="90deg" height={60} />
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography>Number of courts</Typography>
              </Grid>
              <Grid item>
                <Typography>1</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon icon="mdi:basketball-hoop-outline" height={60} />
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography>Number of hoops</Typography>
              </Grid>
              <Grid item>
                <Typography>1</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon icon="material-symbols:table-lamp" height={60} />
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography>Lightning</Typography>
              </Grid>
              <Grid item>
                <Typography>n/a</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography sx={{ color: "blue" }}>
            TODO: TIMELINE SLIDER COMPONENT
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default observer(CourtDetailsModal);

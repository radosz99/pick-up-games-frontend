import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";

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

function CourtDetailsIconsWithCarusel() {
  const { appStore } = useStore();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={2}>
        <Carousel
          sx={{ textAlign: "center", mt: 5, width: "30vw" }}
          navButtonsAlwaysVisible={true}
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={7}
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
              <Typography variant="p">Number of courts</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h3">1</Typography>
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
              <Typography variant="p">Number of hoops</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h3">1</Typography>
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
              <Typography variant="p">Lightning</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h3">n/a</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default observer(CourtDetailsIconsWithCarusel);

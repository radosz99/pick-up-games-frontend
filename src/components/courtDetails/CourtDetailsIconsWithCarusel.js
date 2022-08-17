import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

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

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Item(props) {
  return <img height={200} alt="court" src={props.item.imgUrl} />;
}

function CourtDetailsIconsWithCarusel() {
  const { appStore } = useStore();
  var now = new Date();

  const handleChange = (event) => {
    appStore.setSelectedDay(event.target.value);
  };
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
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={7}
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
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
        <Grid item sx={{ mt: 3 }}>
          <InputLabel id="day-select-label">Day</InputLabel>
          <Select
            labelId="day-select-label"
            id="day-select"
            value={appStore.selectedDay}
            label="Day"
            onChange={handleChange}
          >
            <MenuItem value={0}>{days[now.getDay()]}</MenuItem>
            <MenuItem value={1}>{days[now.getDay() + 1]}</MenuItem>
            <MenuItem value={2}>{days[now.getDay() + 2]}</MenuItem>
            <MenuItem value={3}>{days[now.getDay() + 3]}</MenuItem>
            <MenuItem value={4}>{days[now.getDay() + 4]}</MenuItem>
            <MenuItem value={5}>{days[now.getDay() + 5]}</MenuItem>
            <MenuItem value={6}>{days[now.getDay() + 6]}</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default observer(CourtDetailsIconsWithCarusel);

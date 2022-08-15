import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";

function WeatherComponent() {
  const { appStore } = useStore();
  return (
    <Grid
      item
      xs={4}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        sx={{
          mx: 1,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Icon icon="emojione:sun-behind-rain-cloud" height={60} />
        <Typography variant="p" sx={{ mx: 2 }}>
          28°C
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="p">RAIN PROBABILITY: 90%</Typography>
        <br />
        <Typography variant="p">HUMIDITY: 43%</Typography>
        <br />
        <Typography variant="p">WIND: 13 KM/H</Typography>
      </Grid>
    </Grid>
  );
}

export default observer(WeatherComponent);

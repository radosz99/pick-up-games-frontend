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
      xs={3}
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
        <Icon
          icon="emojione:sun-behind-rain-cloud"
          height={60}
          sx={{ pr: 5 }}
        />
        <Typography sx={{ mx: 2 }}>28°C</Typography>
      </Grid>
      <Grid item>
        <Typography>RAIN PROBABILITY: 90%</Typography>
        <Typography>HUMIDITY: 43%</Typography>
        <Typography>WIND: 13 KM/H</Typography>
      </Grid>
    </Grid>
  );
}

export default observer(WeatherComponent);

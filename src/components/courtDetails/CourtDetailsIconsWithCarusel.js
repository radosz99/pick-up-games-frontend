import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { useState } from "react";

var items = [
  {
    imgUrl:
      "//images.unsplash.com/photo-1602357280104-742c517a1d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80",
  },
  {
    imgUrl:
      "//images.unsplash.com/photo-1600534220378-df36338afc40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
  },
];

function Item(props) {
  return <img height={200} alt="court" src={props.item.imgUrl} />;
}

function CourtDetailsIconsWithCarusel() {
  const { appStore } = useStore();

  const [value, setValue] = useState(new Date().getTime());

  const handleDateChange = (newValue) => {
    setValue(newValue);
    let selectedDay = new Date(newValue).getDate() - new Date().getDate();
    appStore.setSelectedDay(selectedDay);
    let isToday = new Date(newValue).getDay() === new Date().getDay();
    if (isToday) appStore.setCurrentHour(new Date().getHours());
    else appStore.setCurrentHour(5);
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
          sx={{ textAlign: "center", mt: 5, width: "30vw", height: 200 }}
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
        item
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
                <Typography variant="p">Courts</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">
                  {appStore.selectedCourt &&
                    appStore.selectedCourt.details.courts_number}
                </Typography>
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
                <Typography variant="p">Hoops</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">
                  {appStore.selectedCourt &&
                    appStore.selectedCourt.details.hoops_number}
                </Typography>
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
                <Typography variant="p">Lighting</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">
                  {appStore.selectedCourt
                    ? appStore.selectedCourt.details.lightning
                      ? "Yes"
                      : "No"
                    : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ mt: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              disablePast={true}
              inputFormat="dd/MM/yyyy"
              minDate={new Date().setDate(new Date().getDate() - 7)}
              maxDate={new Date().setDate(new Date().getDate() + 7)}
              value={value}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default observer(CourtDetailsIconsWithCarusel);

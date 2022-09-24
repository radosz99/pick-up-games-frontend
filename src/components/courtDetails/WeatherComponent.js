import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Grid from "@mui/material/Grid";
import WeatherWidget from "../weatherWidget/WeatherWidget";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/constants";
import { hour } from "../../constants/constants";
import { hoursMarksConverter } from "../../constants/utils";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function WeatherComponent() {
  const { appStore } = useStore();

  const [forecast, setForecast] = useState([]);
  const [step_in_hours, setStep_in_hours] = useState(0);
  const [loading_forecast, setLoading_forecast] = useState(false);

  let start_range = appStore.hoursRange[0];
  // let end_range = appStore.hoursRange[1];
  let selectedHourInUnixSec = 0;
  let start_date = new Date(
    new Date().setDate(new Date().getDate() + appStore.selectedDay)
  );

  if (start_range < 25) {
    selectedHourInUnixSec = Math.floor(
      start_date.setHours(start_range, 0, 0, 0) / 1000
    );
  } else {
    let date = new Date(start_date.setDate(start_date.getDate() + 1)).setHours(
      hoursMarksConverter(start_range),
      0,
      0,
      0
    );
    selectedHourInUnixSec = Math.floor(date / 1000);
  }

  useEffect(() => {
    let lat = 51;
    let lon = 17;
    if (appStore.selectedCourt) {
      lat = appStore.selectedCourt.address.latitude;
      lon = appStore.selectedCourt.address.longitude;
    }
    try {
      setLoading_forecast(true);
      axios
        .get(`${baseUrl}/forecast?lat=${lat}`, {
          params: {
            lon: lon,
            start: selectedHourInUnixSec,
            end: selectedHourInUnixSec + 8 * hour,
          },
        })
        .then((response) => {
          setLoading_forecast(false);

          const transformData = [];

          setStep_in_hours(response.data.step_in_hours);

          let temp = response.data.single_forecasts;

          temp.forEach((temp) => {
            transformData.push({
              clouds: temp.clouds,
              dt: temp.unix_timestamp, //date time
              pop: temp.pop * 100, // prawdopodobieństwo deszczu
              // unix_timestamp: temp.unix_timestamp,
              desc_1: temp.desc_1,
              desc_2: temp.desc_2,
              humidity: temp.humidity,
              icon_url: temp.icon_url,
              rain: temp.rain,
              snow: temp.snow,
              temp: temp.temp,
              uvi: temp.uvi,
              wind_speed: temp.wind_speed,
            });
          });
          setForecast(transformData);
        })
        .catch((error) => {
          setForecast([]);
          setLoading_forecast(false);
        });
    } catch (err) {
      setLoading_forecast(false);
      console.log(err);
    }
  }, [selectedHourInUnixSec, appStore.selectedCourt]); // notice the empty array here

  return (
    <Grid item xs={5} sx={{ height: 250 }}>
      {(forecast.length > 0) & !loading_forecast && (
        <WeatherWidget
          config={{
            location: "Wrocław", //TODO
            unit: "metric",
            locale: "zh-tw",
            step: step_in_hours,
          }}
          forecast={forecast}
        />
      )}
      {loading_forecast && (
        <Box
          sx={{ mt: 5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">Loading ...</Typography>
        </Box>
      )}
      {forecast.length === 0 && !loading_forecast && (
        <Box
          sx={{ mt: 5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">
            Weather for this date is not available
          </Typography>
        </Box>
      )}
    </Grid>
  );
}

export default observer(WeatherComponent);

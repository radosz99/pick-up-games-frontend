import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Grid from "@mui/material/Grid";
import WeatherWidget from "../weatherWidget/WeatherWidget";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/constants";
import { hour } from "../../constants/constants";

function WeatherComponent() {
  const { appStore } = useStore();

  const currentHourInUnixSec = Math.floor(
    new Date().setMinutes(0, 0, 0) / 1000
  );

  const [forecast, setForecast] = useState([]);
  const [step_in_hours, setStep_in_hours] = useState(0);

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/weather?lat${51}`, {
          params: {
            lon: 17,
            start: currentHourInUnixSec,
            end: currentHourInUnixSec + 8 * hour,
          },
        })
        .then((response) => {
          const transformData = [];
          const start = response.data.start;
          const end = response.data.end;

          setStep_in_hours(response.data.step_in_hours);

          let temp = response.data.single_forecasts;

          temp.forEach((temp) => {
            transformData.push({
              clouds: temp.clouds,
              dt: temp.unix_timestamp, //date time
              pop: temp.pop, // prawdopodobieństwo deszczu
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
        });
    } catch (err) {
      console.log(err);
    }
  }, [currentHourInUnixSec]); // notice the empty array here

  return (
    <Grid item xs={5}>
      {forecast.length > 0 && (
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
    </Grid>
  );
}

export default observer(WeatherComponent);

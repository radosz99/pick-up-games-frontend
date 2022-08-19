import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Grid from "@mui/material/Grid";
import WeatherWidget from "../weatherWidget/WeatherWidget";
import React, { useState, useEffect } from "react";
import axios from "axios";
// mock data for testing without API call
import { baseUrl } from "../../constants/constants";

const cities = [
  { city: "taipei", label: "🇹🇼 Taipei" },
  { city: "tokyo", label: "🇯🇵 Tokyo" },
  { city: "moscow", label: "🇷🇺 Moscow" },
  { city: "sydney", label: "🇦🇺 Sydney" },
  { city: "london", label: "🇬🇧 London" },
  { city: "paris", label: "🇫🇷 Paris" },
  { city: "mexico", label: "🇲🇽 Mexico" },
  { city: "seattle", label: "🇺🇸 Seattle" },
  { city: "washington", label: "🇺🇸 Washington" },
  { city: "beijing", label: "🇨🇳 Beijing" },
];

function WeatherComponent() {
  const { appStore } = useStore();

  const params = new URLSearchParams(window.location.search);
  const city = params.get("city_index");

  const [cityIndex, setCityIndex] = useState(city || 0);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const fetchWeatherAsync = async (cityId) => {
    try {
      const response = await axios.get(`${baseUrl}/weather?lat${51}`, {
        // params: {
        //   q: cityId,
        //   lang: "zh_tw",
        //   appid: OPEN_WEATHER_MAP_KEY,
        //   units: "metric",
        // },
        params: {
          lon: 17,
          start: Math.floor(new Date().getTime() / 1000) + 3600,
          end: Math.floor(new Date().getTime() / 1000) + 10800,
        },
      });

      const transformData = await response.data;

      console.log(transformData);

      // const transformData = await response.data.list.map((data) => ({
      //   dt: data.dt,
      //   temp: data.main.temp,
      //   temp_min: data.main.temp_min,
      //   temp_max: data.main.temp_max,
      //   humidity: data.main.humidity,
      //   icon: data.weather[0].icon,
      //   desc: data.weather[0].description,
      //   clouds: data.clouds.all,
      //   wind: data.wind.speed,
      // }));
      setForecast(transformData);
    } catch (err) {
      console.log(err);
      // if (OPEN_WEATHER_MAP_KEY.length === 0) {
      //   // Use mock data if no key
      //   const transformData = await testData.list.map((data) => ({
      //     dt: data.dt,
      //     temp: data.main.temp,
      //     temp_min: data.main.temp_min,
      //     temp_max: data.main.temp_max,
      //     humidity: data.main.humidity,
      //     icon: data.weather[0].icon,
      //     desc: data.weather[0].description,
      //     clouds: data.clouds.all,
      //     wind: data.wind.speed,
      //   }));
      //   setForecast(transformData);
      //   setError("");
      // } else {
      //   setError(err.stack);
      // }
    }
  };

  useEffect(() => {
    fetchWeatherAsync(cities[cityIndex].city);
  }, [cityIndex]); // notice the empty array here

  return (
    <Grid item xs={4}>
      <WeatherWidget
        config={{
          location: cities[cityIndex].label,
          unit: "metric",
          locale: "zh-tw",
          onLocationClick: () => {
            if (cityIndex + 1 >= cities.length) {
              setCityIndex(0);
              fetchWeatherAsync(cities[0].city);
            } else {
              setCityIndex(cityIndex + 1);
              fetchWeatherAsync(cities[cityIndex + 1].city);
            }
          },
        }}
        forecast={forecast}
      />
    </Grid>
  );
}

export default observer(WeatherComponent);

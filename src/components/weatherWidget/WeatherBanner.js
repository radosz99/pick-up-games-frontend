import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Typography } from "@mui/material";
/**
 * Render a primary display of the current forecast, including a date time, a weather icon,
 * current temperature, humidity, cloud density and wind
 *
 * @param {object} forecastNow the current forecast
 * @param {string} unit the unit format for figures, only accepting 'metric' for now
 * @param {locale} locale locale for time formating
 */
const WeatherBanner = ({ forecastNow, unit, locale }) => (
  <div>
    <Typography
      variant="h1"
      style={{ fontSize: "0.83em", fontWeight: "bold" }}
    >{`${moment.unix(forecastNow.dt).locale(locale).format("dddd a h:mm")}, ${
      forecastNow.desc_1
    }, ${forecastNow.desc_2}`}</Typography>
    <BannerContainer>
      <BannerIcon src={forecastNow.icon_url} />
      <Temperature>
        {(Math.round(forecastNow.temp * 10) / 10).toFixed(1)}
      </Temperature>
      <Unit>
        &deg;
        {unit === "metric" ? "C" : "F"}
      </Unit>
      <div
        style={{
          marginLeft: 80,
          marginTop: -40,
        }}
      >
        <InfoText>
          Clouds: <b>{forecastNow.clouds}%</b>
        </InfoText>
        <InfoText>
          Rain: <b>{forecastNow.rain.toFixed(2)} mm/h</b>
        </InfoText>
        <InfoText>
          Humidity: <b>{forecastNow.humidity}%</b>
        </InfoText>
        <InfoText>
          Wind:{" "}
          <b>
            {forecastNow.wind_speed}
            {unit === "metric" ? "m/s" : "mph"}
          </b>
        </InfoText>
        <InfoText>
          Pop: <b>{Math.floor(forecastNow.pop, 2)}%</b>
        </InfoText>
        <InfoText>
          Uvi: <b>{forecastNow.uvi}</b>
        </InfoText>
      </div>
    </BannerContainer>
  </div>
);

WeatherBanner.defaultProps = {
  unit: "metric",
  locale: "zh-tw",
};

WeatherBanner.propTypes = {
  forecastNow: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    icon_url: PropTypes.string.isRequired,
    desc_1: PropTypes.string.isRequired,
    desc_2: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
    wind_speed: PropTypes.number.isRequired,
    pop: PropTypes.number.isRequired,
    rain: PropTypes.number.isRequired,
    uvi: PropTypes.number.isRequired,
    snow: PropTypes.number.isRequired,
  }).isRequired,
  unit: PropTypes.string,
  locale: PropTypes.string,
};

export default WeatherBanner;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BannerIcon = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Temperature = styled.div`
  font-size: 3rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const Unit = styled.div`
  font-size: 1rem;
  margin-top: 0.7rem;
`;

const InfoText = styled.div`
  text-align: left;
`;

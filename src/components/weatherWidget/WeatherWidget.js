import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import WeatherBannerTab from "./WeatherBannerTab";

const WeatherWidget = ({ config, forecast }) => {
  const [forecastIdx, setForecastIdx] = useState(0);

  if (forecast !== undefined && forecast.length > 0) {
    let firstMomentOfDay;
    let forecastOfDay = [];
    const forecastOfDayList = [];
    /* eslint-disable no-param-reassign */
    forecast.forEach((item, index) => {
      if (firstMomentOfDay === undefined) {
        firstMomentOfDay = moment.unix(item.dt);
        forecast[index].moment = firstMomentOfDay;
        forecastOfDay.push(item);
        forecastOfDayList.push(forecastOfDay);
      }
      // else {
      //   const currentMoment = moment.unix(item.dt);
      //   forecast[index].moment = currentMoment;
      //   if (firstMomentOfDay.isSame(currentMoment, "day")) {
      //     forecastOfDay.push(item);
      //   } else {
      //     forecastOfDayList.push(forecastOfDay);
      //     forecastOfDay = [];
      //     forecastOfDay.push(item);
      //     firstMomentOfDay = currentMoment;
      //   }
      // }
    });
    /* eslint-enable no-param-reassign */
    const forecastList = forecastOfDayList;
    return (
      <ContentContainer>
        <WeatherBannerTab
          className=""
          location={config.location}
          forecastOfDay={forecastList[forecastIdx]}
          unit={config.unit}
          locale={config.locale}
          onLocationClick={config.onLocationClick}
          step={config.step}
        />
      </ContentContainer>
    );
  }
};

WeatherWidget.defaultProps = {
  config: PropTypes.arrayOf({
    unit: "metric",
  }),
  forecast: [],
};

WeatherWidget.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  config: PropTypes.shape({
    location: PropTypes.string.isRequired,
    unit: PropTypes.string,
    locale: PropTypes.string,
  }),
};

const ContentContainer = styled.div`
  display: block;
  margin: 10px 5px;
  text-align: left;
  padding: 1rem 1rem;
`;

export default WeatherWidget;

import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Box from "@mui/material/Box";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import "../../styles.css";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  //   color: "#3a8589",
  height: 3,
  //   padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&.second-thumb": {
      //   border: "2px dashed purple",
    },
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      marginLeft: 1,
      marginRight: 1,
    },
    "&.first-thumb .airbnb-bar": {
      backgroundColor: "red",
      color: "red",
    },
    "&.second-thumb .airbnb-bar": {
      backgroundColor: "currentColor",
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, className, ...other } = props;
  const extraClassName =
    other["data-index"] === 0 ? "first-thumb" : "second-thumb";
  return (
    <SliderThumb {...other} className={clsx(className, extraClassName)}>
      {children}
      {extraClassName === "first-thumb" && <ArrowDownwardIcon />}
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const hoursMarks = [
  {
    value: 0,
    label: "12pm",
  },
  {
    value: 1,
    label: "1am",
  },
  {
    value: 2,
    label: "2am",
  },
  {
    value: 3,
    label: "3am",
  },
  {
    value: 4,
    label: "4am",
  },
  {
    value: 5,
    label: "5am",
  },
  {
    value: 6,
    label: "6am",
  },
  {
    value: 7,
    label: "7am",
  },
  {
    value: 8,
    label: "8am",
  },
  {
    value: 9,
    label: "9am",
  },
  {
    value: 10,
    label: "10am",
  },
  {
    value: 11,
    label: "11am",
  },
  {
    value: 12,
    label: "12am",
  },
  {
    value: 13,
    label: "1pm",
  },
  {
    value: 14,
    label: "2pm",
  },
  {
    value: 15,
    label: "3pm",
  },
  {
    value: 16,
    label: "4am",
  },
  {
    value: 17,
    label: "5am",
  },
  {
    value: 18,
    label: "6pm",
  },
  {
    value: 19,
    label: "7pm",
  },
  {
    value: 20,
    label: "8pm",
  },
  {
    value: 21,
    label: "9am",
  },
  {
    value: 22,
    label: "10pm",
  },
  {
    value: 23,
    label: "11pm",
  },
];

function TimelineSliderComponent() {
  const { appStore } = useStore();

  const handleChange = (event, newValue) => {
    appStore.setHoursRange(newValue);
  };

  const numFormatter = (num) => {
    if (num === 0) return "12 pm";
    if (num < 13) return num + " am";
    else return num - 12 + " pm";
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <Box sx={{ width: "75vw", textAlign: "center", mt: 5 }}>
          <AirbnbSlider
            getAriaLabel={() => "Hour range"}
            components={{ Thumb: AirbnbThumbComponent }}
            value={appStore.hoursRange}
            marks={hoursMarks}
            valueLabelFormat={numFormatter}
            min={0}
            max={23}
            onChange={handleChange}
            // valueLabelDisplay="on"
            sx={{}}
          />
        </Box>
      </Grid>
      <Grid item sx={{ mt: 5 }}>
        <Typography variant="h4">
          TIME CHOSEN: {numFormatter(appStore.hoursRange[0]).toUpperCase()}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default observer(TimelineSliderComponent);

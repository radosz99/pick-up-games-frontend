import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Box from "@mui/material/Box";
import Slider, { SliderThumb, SliderMark } from "@mui/material/Slider";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import "../../styles.css";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";
import { hoursMarks } from "../../constants/constants";
import { useState } from "react";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "##3a8589",
  background:
    "linear-gradient(90deg, rgba(223,10,47,1) 0%, rgba(95,9,121,1) 50%, rgba(0,212,255,1) 100%)",
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
      // backgroundColor: "red",
      // color: "red",
    },
    "&.second-thumb .airbnb-bar": {
      // backgroundColor: "currentColor",
    },
  },
  "& .MuiSlider-track": {
    height: 3,
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiSlider-rail": {
    // color: theme.palette.mode === "dark" ? "##3a8589" : "#3a8589",
    // opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 0,
  },
  "& .MuiSlider-mark": {
    height: 10,
    width: 10,
  },
  "& .MuiSlider-mark:hover": {
    backgroundColor: theme.palette.secondary.main,
    // width: "4.34783%",
  },
}));

function CustomThumbComponent(props) {
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

function CustomMarkComponent(props) {
  const { children, className, ...other } = props;
  const [visible, setVisible] = useState(false);

  return (
    <SliderMark
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      {...other}
      className={className}
    >
      {children}
      {visible && (
        <span
          style={{
            position: "absolute",
            top: -50,
            left: -40,
            width: 100,
            color: "white",
            backgroundColor: "black",
            borderRadius: 6,
            padding: "5 0",
          }}
        >
          Players 2
        </span>
      )}
    </SliderMark>
  );
}

CustomThumbComponent.propTypes = {
  children: PropTypes.node,
};

function TimelineSliderComponent() {
  const { appStore } = useStore();

  useEffect(() => {
    appStore.setCurrentHour(new Date().getHours());
  }, [appStore]);

  const handleChange = (event, newValue) => {
    appStore.setHoursRange(newValue);
  };

  const numFormatter = (num) => {
    // console.log(num);
    // 0 - 12 = 12pm - 12am
    // 13 - 24 = 1pm - 12pm
    // 25 - 36 = 1 am - 12am
    // 37 - 48 = 1 pm - 12pm
    let text = "";
    if (num % 1 !== 0) {
      if (Math.floor(num) % 12 === 0) num = 0.5;
    } else {
      if (num % 12 === 0) num = 0;
    }

    if (num % 1 !== 0) {
      // :30
      if (num < 13) {
        text = num.toString().split(".")[0] + ":30 am";
      } else if (num > 12 && num < 25) {
        text = (num - 12).toString().split(".")[0] + ":30 pm";
      } else if (num > 24 && num < 37) {
        text = (num - 24).toString().split(".")[0] + ":30 am";
      } else if (num > 36 && num < 49) {
        text = (num - 24 - 12).toString().split(".")[0] + ":30 pm";
      }
    } else {
      // :00
      if (num < 13) {
        text = num.toString() + " am";
      } else if (num > 12 && num < 25) {
        text = (num - 12).toString() + " pm";
      } else if (num > 24 && num < 37) {
        text = (num - 24).toString() + " am";
      } else if (num > 36 && num < 49) {
        text = (num - 24 - 12).toString() + " pm";
      }
    }
    return text;
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <Box sx={{ width: "75vw", textAlign: "center", mt: 5 }}>
          <CustomSlider
            getAriaLabel={() => "Hour range"}
            components={{
              Thumb: CustomThumbComponent,
              Mark: CustomMarkComponent,
            }}
            value={appStore.hoursRange}
            isRtl={true}
            marks={hoursMarks}
            valueLabelFormat={numFormatter}
            min={appStore.currentHour}
            max={appStore.currentHour + 23}
            step={0.5}
            onChange={handleChange}
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

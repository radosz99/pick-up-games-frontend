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
import { hoursMarks } from "../../constants/constants";
import { useState } from "react";
import { numFormatter } from "../../constants/utils";

const CustomSlider = styled(Slider)(({ theme }) => ({
  // color: "#3a8589",
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
    height: 12,
    width: 12,
    border: "1px solid",
    borderRadius: "50px",
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
            max={appStore.currentHour < 24 ? 23.5 : 47.5}
            step={0.5}
            onChange={handleChange}
            sx={{
              background: `
              linear-gradient(90deg,
                rgb(255,0,0) ${4.34783}%,
                rgb(255,0,0) ${4.34783 * 2}%,
                rgb(150,0,0) ${4.34783 * 3}%,
                rgb(125,0,0) ${4.34783 * 4}%,
                rgb(100,0,0) ${4.34783 * 5}%,
                rgb(255,0,0) ${4.34783 * 6}%,
                rgb(255,0,0) ${4.34783 * 7}%,
                rgb(255,0,0) ${4.34783 * 8}%,
                rgb(255,0,0) ${4.34783 * 9}%,
                rgb(255,0,0) ${4.34783 * 10}%,
                rgb(255,0,0) ${4.34783 * 11}%,
                rgb(255,0,0) ${4.34783 * 12}%,
                rgb(255,0,0) ${4.34783 * 13}%,
                rgb(255,0,0) ${4.34783 * 14}%,
                rgb(255,0,0) ${4.34783 * 15}%,
                rgb(255,0,0) ${4.34783 * 16}%,
                rgb(255,0,0) ${4.34783 * 17}%,
                rgb(255,0,0) ${4.34783 * 18}%,
                rgb(255,0,0) ${4.34783 * 19}%,
                rgb(255,0,0) ${4.34783 * 20}%,
                rgb(255,0,0) ${4.34783 * 21}%,
                rgb(100,250,50) ${4.34783 * 22}%,
                rgb(255,0,0) ${4.34783 * 23}%)
            `,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default observer(TimelineSliderComponent);

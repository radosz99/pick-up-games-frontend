import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Box from "@mui/material/Box";

function TimelineSliderComponent() {
  const { appStore } = useStore();
  return (
    <Box sx={{ mt: 5, textAlign: "center" }}>
      <Typography sx={{ color: "blue" }}>
        TODO: TIMELINE SLIDER COMPONENT
      </Typography>
    </Box>
  );
}

export default observer(TimelineSliderComponent);

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { useStore } from "../stores/store";
import { useTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

function CourtListItem({ court }) {
  const { appStore } = useStore();
  const theme = useTheme();

  const [outdoor, setOutdoor] = useState(true);
  const [indoor, setIndoor] = useState(false);
  const [playersToday, setPlayersToday] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [rated, setRated] = useState(false);

  const resetFiltersHandler = () => {
    setOutdoor(false);
    setIndoor(false);
    setPlayersToday(false);
    setPhotos(false);
    setRated(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        p: 1,
        mt: 10,
        ml: 3,
        border: 15,
        borderColor: theme.palette.secondary.main,
        borderRadius: 10,
      }}
    >
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              value={outdoor}
              checked={outdoor}
              onChange={(e) => setOutdoor(e.target.checked)}
            />
          }
          label={<Typography variant="p">Outdoor</Typography>}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              value={indoor}
              checked={indoor}
              onChange={(e) => setIndoor(e.target.checked)}
            />
          }
          label={<Typography variant="p">Indoor</Typography>}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              value={playersToday}
              checked={playersToday}
              onChange={(e) => setPlayersToday(e.target.checked)}
            />
          }
          label={<Typography variant="p">With players today</Typography>}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              value={photos}
              checked={photos}
              onChange={(e) => setPhotos(e.target.checked)}
            />
          }
          label={<Typography variant="p">With photos</Typography>}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              value={rated}
              checked={rated}
              onChange={(e) => setRated(e.target.checked)}
            />
          }
          label={<Typography variant="p">Highly rated</Typography>}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={resetFiltersHandler}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ ml: 5 }}
          onClick={(e) => {}}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
}

export default observer(CourtListItem);

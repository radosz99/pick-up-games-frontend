import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { useStore } from "../stores/store";
import { useTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function CourtListItem({ court }) {
  const { appStore } = useStore();
  const theme = useTheme();

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
          control={<Checkbox />}
          label={<Typography variant="p">Outdoor</Typography>}
        />
        <br />
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography variant="p">Indoor</Typography>}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography variant="p">With players today</Typography>}
        />
        <br />
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography variant="p">With photos</Typography>}
        />
        <br />
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography variant="p">Highly rated</Typography>}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={(e) => {}}
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

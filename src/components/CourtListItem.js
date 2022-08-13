import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NavigationIcon from "@mui/icons-material/Navigation";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { useStore } from "../stores/store";

function CourtListItem() {
  const { appStore } = useStore();
  return (
    <Box
      sx={{
        backgroundColor: "#E3F2FD",
        p: 2,
        mt: 3,
        ml: 2,
        border: 15,
        borderColor: "#E3F2FD",
        borderRadius: 3,
      }}
    >
      <Typography variant="h4">Court name</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating name="read-only" value={4} readOnly />
        <Typography component="legend" sx={{ ml: 4 }}>
          2 ratings
        </Typography>
      </Box>
      <Typography sx={{ mt: 2 }}>Location, Country</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Button
          sx={{ color: "red" }}
          onClick={() => appStore.setCourtModalOpen(true)}
        >
          See court details
        </Button>
        <Box
          sx={{
            mx: 3,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <PeopleAltIcon sx={{ mr: 1 }} />
          <Typography>2</Typography>
        </Box>

        <Box
          sx={{
            mx: 3,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <NavigationIcon />
          <Typography>1.5 km</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(CourtListItem);

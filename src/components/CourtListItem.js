import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NavigationIcon from "@mui/icons-material/Navigation";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { useStore } from "../stores/store";
import { useTheme } from "@mui/material/styles";

function CourtListItem({ court }) {
  const { appStore } = useStore();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        p: 2,
        mt: 3,
        ml: 2,
        border: 15,
        borderColor: theme.palette.secondary.main,
        borderRadius: 3,
      }}
    >
      <Typography fontWeight="bold" variant="h5">
        {court.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating name="read-only" value={4} readOnly />
        <Typography variant="p" component="legend" sx={{ ml: 4 }}>
          2 RATINGS
        </Typography>
      </Box>
      <Typography variant="p" sx={{ mt: 2 }}>
        {court.address.street_name} {court.address.street_number},{" "}
        {court.address.city}, {court.address.country}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Button
          sx={{ color: "red", fontSize: 14 }}
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
          <Typography variant="p">2</Typography>
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
          <Typography variant="p">1.5 km</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(CourtListItem);

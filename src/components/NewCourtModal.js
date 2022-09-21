import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "#D9D9D9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NewCourtModal() {
  const { appStore } = useStore();

  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const [surfaceType, setSurfaceType] = useState("");
  const [numberOfHoops, setNumberOfHoops] = useState("");
  const [numberOfCourts, setNumberOfCourts] = useState("");
  const [rimHeight, setRimHeight] = useState("");
  const [lightning, setLightning] = useState("");
  const [openToPublic, setOpenToPublic] = useState("");

  return (
    <Modal
      open={appStore.addCourtModalOpen}
      onClose={() => {
        appStore.setAddCourtModalOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          onClick={() => {
            appStore.setAddCourtModalOpen(false);
          }}
          sx={{ position: "absolute", right: 30, cursor: "pointer" }}
        >
          <CloseIcon />
        </Box>
        <Typography variant="h2" align="center">
          ADD NEW COURT
        </Typography>
        <Box>
          <Typography variant="h3" align="left" sx={{ mt: 5 }}>
            Court Adress
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 2 }}
          >
            <Grid item xs={2} sx={{ mr: 5 }}>
              <TextField
                label="Court name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2} sx={{ mr: 5 }}>
              <TextField
                label="City"
                value={appStore.newCourtShortInfo.city}
                onChange={(event) => {
                  appStore.setNewCourtShortInfo({
                    road: appStore.newCourtShortInfo.road,
                    city: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={2} sx={{ mr: 5 }}>
              <TextField
                label="Street"
                value={appStore.newCourtShortInfo.road}
                onChange={(event) => {
                  appStore.setNewCourtShortInfo({
                    road: event.target.value,
                    city: appStore.newCourtShortInfo.city,
                  });
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h3" align="left">
            Court Type
          </Typography>
          <Grid
            sx={{ mt: 2 }}
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  autoWidth
                  value={type}
                  label="type"
                  onChange={(event) => setType(event.target.value)}
                  sx={{ textAlign: "center" }}
                >
                  <MenuItem value={1}>Outdoor</MenuItem>
                  <MenuItem value={2}>Indoor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h3" align="left">
            Court Properties
          </Typography>
          <Grid
            sx={{ mt: 2 }}
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item sx={{ mr: 5 }} xs={2}>
                <FormControl fullWidth>
                  <InputLabel id="surface-type-select-label">
                    Surface type
                  </InputLabel>
                  <Select
                    labelId="surface-type-select-label"
                    id="surface-type-select"
                    autoWidth
                    value={surfaceType}
                    label="Surface type"
                    onChange={(event) => setSurfaceType(event.target.value)}
                    sx={{ textAlign: "center" }}
                  >
                    <MenuItem value={1}>n/a</MenuItem>
                    <MenuItem value={2}>Cement</MenuItem>
                    <MenuItem value={3}>Concrete</MenuItem>
                    <MenuItem value={4}>Dirt</MenuItem>
                    <MenuItem value={5}>Grass</MenuItem>
                    <MenuItem value={6}>Plastic</MenuItem>
                    <MenuItem value={7}>Rubber</MenuItem>
                    <MenuItem value={8}>Wood</MenuItem>
                    <MenuItem value={9}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ mr: 5 }} xs={2}>
                <FormControl fullWidth>
                  <InputLabel id="number-of-hoops-select-label">
                    Number of hoops
                  </InputLabel>
                  <Select
                    labelId="number-of-hoops-select-label"
                    id="number-of-hoops-select"
                    autoWidth
                    value={numberOfHoops}
                    label="Number of hoops"
                    onChange={(event) => setNumberOfHoops(event.target.value)}
                    sx={{ textAlign: "center" }}
                  >
                    <MenuItem value={1}>n/a</MenuItem>
                    <MenuItem value={2}>1</MenuItem>
                    <MenuItem value={3}>2</MenuItem>
                    <MenuItem value={4}>3</MenuItem>
                    <MenuItem value={5}>4</MenuItem>
                    <MenuItem value={6}>5</MenuItem>
                    <MenuItem value={7}>6</MenuItem>
                    <MenuItem value={8}>{"> 6"}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id="number-of-courts-select-label">
                    Number of courts
                  </InputLabel>
                  <Select
                    labelId="number-of-courts-select-label"
                    id="number-of-courts-select"
                    autoWidth
                    value={numberOfCourts}
                    label="Number of courts"
                    onChange={(event) => setNumberOfCourts(event.target.value)}
                    sx={{ textAlign: "center" }}
                  >
                    <MenuItem value={1}>n/a</MenuItem>
                    <MenuItem value={2}>1</MenuItem>
                    <MenuItem value={3}>2</MenuItem>
                    <MenuItem value={4}>3</MenuItem>
                    <MenuItem value={5}>{"> 4"}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              sx={{ mt: 2 }}
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={2} sx={{ mr: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="lightning-select-label">Lightning</InputLabel>
                  <Select
                    labelId="lightning-select-label"
                    id="lightning-select"
                    autoWidth
                    value={lightning}
                    label="Lightning"
                    onChange={(event) => setLightning(event.target.value)}
                    sx={{ textAlign: "center" }}
                  >
                    <MenuItem value={1}>n/a</MenuItem>
                    <MenuItem value={2}>Yes</MenuItem>
                    <MenuItem value={3}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ mr: 5 }} xs={2}>
                <FormControl fullWidth>
                  <InputLabel id="openToPublic-select-label">
                    Lightning
                  </InputLabel>
                  <Select
                    labelId="openToPublic-select-label"
                    id="openToPublic-select"
                    autoWidth
                    value={openToPublic}
                    label="OpenToPublic"
                    onChange={(event) => setOpenToPublic(event.target.value)}
                    sx={{ textAlign: "center" }}
                  >
                    <MenuItem value={1}>n/a</MenuItem>
                    <MenuItem value={2}>Yes</MenuItem>
                    <MenuItem value={3}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id="rimHeight-select-label">Lightning</InputLabel>
                  <Select
                    labelId="rimHeight-select-label"
                    id="rimHeight-select"
                    autoWidth
                    value={rimHeight}
                    label="RimHeight"
                    onChange={(event) => setRimHeight(event.target.value)}
                    sx={{ textAlign: "center" }}
                  >
                    <MenuItem value={1}>Too high</MenuItem>
                    <MenuItem value={2}>NBA / Fiba Height</MenuItem>
                    <MenuItem value={3}>Too low</MenuItem>
                    <MenuItem value={4}>Dunk hoop</MenuItem>
                    <MenuItem value={5}>Missing or broken</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          textAlign="center"
          sx={{
            position: "absolute",
            right: 80,
            bottom: 120,
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Photos
          </Typography>
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 250,
              height: 250,
              backgroundColor: "#988989",
            }}
          >
            <AddAPhotoIcon sx={{ fontSize: 65 }} />
          </Box>
        </Box>

        <Box textAlign="center" sx={{ mt: 5 }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ width: "60vw", height: 60 }}
            onClick={() => {
              let model = {
                id: Math.random() * (10000 - 250) + 250,
                name: name,
                address: {
                  country: appStore.newCourtShortInfo.country,
                  city: appStore.newCourtShortInfo.city,
                  street_name: appStore.newCourtShortInfo.road,
                  postal_code: appStore.newCourtShortInfo.postcode,
                  latitude: appStore.newCourtCoordinates.lat,
                  longitude: appStore.newCourtCoordinates.lng,
                  street_number: "35/4", // do wyrzucenia
                },
                details: {
                  courts_number: numberOfCourts,
                  hoops_number: numberOfHoops,
                  lightning: lightning,
                },
                created: Date.now(),
              };
              appStore.addCourt(model);
              appStore.setAddCourtModalOpen(false);
            }}
          >
            SUBMIT COURT
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default observer(NewCourtModal);

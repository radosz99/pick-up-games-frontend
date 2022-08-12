import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

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

  return (
    <Modal
      open={appStore.addCourtModalOpen}
      onClose={() => appStore.setAddCourtModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          onClick={() => appStore.setAddCourtModalOpen(false)}
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
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mt: 2 }}
          >
            <Grid item>
              <TextField label="Court name" />
            </Grid>
            <Grid item>
              <TextField label="City" />
            </Grid>
            <Grid item>
              <TextField label="Street" />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h3" align="left">
            Court Type
          </Typography>
          <TextField label="Type" sx={{ mt: 2 }} />
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
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <TextField label="Surface type" />
              </Grid>
              <Grid item>
                <TextField label="Number of hoops" />
              </Grid>
              <Grid item>
                <TextField label="Number of courts" />
              </Grid>
            </Grid>
            <Grid
              sx={{ mt: 2 }}
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <TextField label="Lightning" />
              </Grid>
              <Grid item>
                <TextField label="Open Public?" />
              </Grid>
              <Grid item>
                <TextField label="Rim height" />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ width: "60vw" }}
            onClick={() => {
              appStore.addCourtMarker(appStore.newCourtCoordinates);
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

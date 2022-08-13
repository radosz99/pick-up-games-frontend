import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import CourtListItem from "../CourtListItem";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function PersistentDrawerRight() {
  const { appStore } = useStore();
  const theme = useTheme();
  let isXL = useMediaQuery(theme.breakpoints.down("xl"));

  let drawerWidth = isXL ? "35vw" : "25vw";

  const handleDrawerClose = () => {
    appStore.setOpenDrawer(false);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: theme.palette.primary.main,
        },
      }}
      variant="persistent"
      anchor="right"
      open={appStore.openDrawer}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Box textAlign="center">
        <Typography variant="h4">COURTS NEARBY</Typography>
      </Box>

      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <CourtListItem />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default observer(PersistentDrawerRight);

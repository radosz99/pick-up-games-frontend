import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./ui/Theme";
import "../styles.css";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Matcher from "./Matcher";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Matcher />}>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default observer(App);

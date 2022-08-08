import React from "react";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <header>
        <h1>Welcome in Matcher!</h1>
      </header>
    </div>
  );
}

export default App;

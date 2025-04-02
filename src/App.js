import React, { useState } from "react";
import WeatherHead from "./WeatherComponents/WeatherHead";
import WeatherBody from "./WeatherComponents/WeatherBody";
import "./App.css";

function App() {
  const [region] = useState("Paris");

  return (
    <div className="App">
      <WeatherHead />
      <WeatherBody location={region} />
    </div>
  );
}

export default App;

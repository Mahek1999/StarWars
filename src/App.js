import React, { useState, useEffect } from "react";
import PlanetSelector from "./Components/PlanetSelector";
import PeopleList from "./Components/PeopleList";
import "./App.css";
import video from './Asset/war1.mp4';

const App = () => {
  const [selectedPlanet, setSelectedPlanet] = useState("");

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
  };

  //using a background video
  useEffect(() => {
    const video = document.getElementById("background-video");
    video.play();
  }, []);

  return (
    <div className="video-background">
      <video id="background-video" className="video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        {/* Add other video formats here, if needed */}
      </video>
      <div className="overlay"></div>
      <div className="content">
        <h1 className="star">Star Wars Planet Search</h1>
        {/* A planet is selected */}
        <PlanetSelector onPlanetSelect={handlePlanetSelect} />
        {selectedPlanet && <PeopleList selectedPlanet={selectedPlanet} />}
      </div>
    </div>
  );
};

export default App;
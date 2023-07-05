import React, { useState, useEffect } from "react";
import axios from "axios";

const PlanetSelector = ({ onPlanetSelect }) => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState("");

  //Getting planet names for the dropdown
  useEffect(() => {
    axios.get("https://swapi.dev/api/planets/").then((response) => {
      setPlanets(response.data.results);
    });
  }, []);
 
  //A planet name is selected name is selected from dropdown
  const handlePlanetChange = (event) => {
    setSelectedPlanet(event.target.value);
    onPlanetSelect(event.target.value);
  };

  return (
    <div>
      <label htmlFor="planet" className="select"> Select a planet:</label>
      <select id="planet" value={selectedPlanet} onChange={handlePlanetChange}>
        <option value="">Select a planet</option>
        {planets.map((planet) => (
          <option key={planet.name} value={planet.name}>
            {planet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlanetSelector;
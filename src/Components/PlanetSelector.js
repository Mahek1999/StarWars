import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

const PlanetSelector = ({ onPlanetSelect }) => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState("");

  //Getting planet names for the dropdown

 useEffect(() => {
    const fetchPlanets = async () => {
      let nextPage = "https://swapi.dev/api/planets/";
      let allPlanets = [];

      while (nextPage) {
        const response = await axios.get(nextPage);
        //const { results, next } = response.data;
        const results = response.data.results;
        const next = response.data.next;
        allPlanets = [...allPlanets, ...results];
        nextPage = next;
      }

      setPlanets(allPlanets);
    };

    fetchPlanets();
  }, []);
 
  //A planet name is selected name is selected from dropdown
  const handlePlanetChange = (event) => {
    setSelectedPlanet(event.target.value);
    onPlanetSelect(event.target.value);
  };

  return (
    <div>
      <label htmlFor="planet" className="select"> Please Select a planet:</label>
      <select id="planet" value={selectedPlanet} className="planet" onChange={handlePlanetChange}>
        <option value=""></option>
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Button, Container, Table } from "react-bootstrap";

//Getting the name of the planet selected from the dropdown
const PeopleList = ({ selectedPlanet }) => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

//Getting resident Urls from Planet name
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://swapi.dev/api/planets`, {
        params: { search: selectedPlanet, page },
      })
      .then((response) => {
        const residents = response.data.results[0].residents;
        fetchResidentsNames(residents);
      })
      .catch((error) => {
        console.error("Error fetching people:", error);
        setIsLoading(false);
      });
  }, [selectedPlanet]);

  useEffect(() => {
    setPeople([]); // Clear the names array when the dropdown value changes
  }, [selectedPlanet]);

  //Getting resident names using Resident Urls in a for loop
  const fetchResidentsNames = async (residents) => {
    const names = [];
    for (let i = 0; i < residents.length; i++) {
      try {
        const response = await axios.get(residents[i]);
        names.push(response.data.name);
      } catch (error) {
        console.error("Error fetching resident:", error);
      }
    }
    setPeople(names);
    setIsLoading(false);
    console.log(residents.length);
    console.log(names.length);

    const totalPages = Math.ceil(names.length / perPage);
    setTotalPages(totalPages);
  };

  const handleNextPage = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      return Math.min(nextPage, totalPages);
    });
  };

  const handlePrevPage = () => {
    setPage((prevPage) => {
      const previousPage = prevPage - 1;
      return Math.max(previousPage, 1);
    });
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedPeople = people.slice(startIndex, endIndex);

  return (
    <Container>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          {displayedPeople.length > 0 ? (
            <div>
              <h2 style={{ color: "#fff" }}>People from {selectedPlanet}:</h2>
              <Table striped bordered hover style={{ width: "50%", margin: "0 auto"}}> 
                { <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Name</th>
                  </tr>
                </thead> }
                <tbody>
                  {displayedPeople.map((name, index) => (
                    <tr key={index}>
                      <td>{(page-1)*10 + index+1}.</td>
                      <td>{name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                onClick={handlePrevPage}
                disabled={page === 1}
                variant="primary"
              >
                Previous Page
              </Button>{" "}
              <Button onClick={handleNextPage} variant="primary" disabled={page===totalPages}>
                Next Page
              </Button>
            </div>
          ) : (
            <p style={{color:'white', fontSize:'20px'}}>No people found from {selectedPlanet}.</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default PeopleList;

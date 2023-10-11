import { React, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useData } from "../dataContext";
import { fetchAnimal } from "../petfinder";

function MatchesPage() {
  // eslint-disable-next-line no-unused-vars
  const { matches } = useData();
  const [loadedPetsData, setLoadedPetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const loadPets = async () => {
      const loadedPetsObj = {};

      const promises = matches.map(async (match) => {
        if (!loadedPetsObj[match]) {
          const result = await fetchAnimal(match);
          loadedPetsObj[match] = result.animal;
        }
      });

      await Promise.all(promises);

      console.log(loadedPetsObj);
      setLoadedPetsData(loadedPetsObj);
      setIsLoading(false);
    };

    loadPets();
  }, [matches]);

  return (
    <div className="p-4">
      <h2>My Matches</h2>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        matches.map((match) => (
          <Card className="mt-4 vh-10 vw-75" style={{ flexDirection: "row" }}>
            <Card.Img
              variant="top"
              className="w-25 mh-100 object-fit-cover"
              src={loadedPetsData[match].photos[0].medium}
            />
            <Card.Body>
              <Card.Title>{loadedPetsData[match].name}</Card.Title>
              <Card.Text>{loadedPetsData[match].description}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default MatchesPage;

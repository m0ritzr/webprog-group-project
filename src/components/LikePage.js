import React, { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useData } from "../dataContext";
import { fetchAnimals } from "../petfinder";
import { useEffect, useCallback } from "react";

function LikePage() {
  // eslint-disable-next-line no-unused-vars
  const { settings, setMatches, matches, setDeclined, declined } = useData();

  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMorePets = useCallback(async () => {
    setIsLoading(true);

    console.log(settings);
    const animals = await fetchAnimals({ ...settings, page: currentPage });
    const animalsWithPhotos = animals.animals.filter(
      (animal) => animal.photos.length !== 0,
    );
    const uniqueAnimals = animalsWithPhotos.filter(
      (animal) => !matches.includes(animal.id) && !declined.includes(animal.id),
    );

    setPets((prevPets) => [...prevPets, ...uniqueAnimals]);
    setIsLoading(false);
  }, [settings, currentPage, matches, declined]);

  useEffect(() => {
    if (Object.keys(settings).length !== 0 && !pets.length) {
      fetchMorePets();
    }
  }, [pets, fetchMorePets, settings]);

  function handleLikeClick() {
    if (pets.length) {
      setMatches([...matches, pets[0].id]);
      setPets(pets.slice(1));
    }
  }

  function handleDislikeClick() {
    if (pets.length) {
      setDeclined([...declined, pets[0].id]);
      setPets(pets.slice(1));
    }
  }

  useEffect(() => {
    if (!pets.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [pets]);

  // TODO, make height fit the screen
  // Stop container from changing size when image is changes
  return (
    <div className="container-sm p-3">
      <h2>Like Pets</h2>
      <Card style={{ height: "90vh", maxWidth: "50vw" }}>
        {isLoading ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : (
          <Card.Img
            className="w-100 h-75 object-fit-cover"
            variant="top"
            src={pets[0]?.photos[0].large || ""}
          />
        )}

        <Card.Body className="h-25">
          <Card.Title>
            {isLoading ? "Loading..." : pets[0]?.name || "Pet Name"}
          </Card.Title>
          <Card.Text>Pet Details</Card.Text>
          <div className="col">
            <Button
              variant="success"
              size="lg"
              onClick={handleLikeClick}
              disabled={isLoading}
            >
              Like
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={handleDislikeClick}
              disabled={isLoading}
            >
              Dislike
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LikePage;

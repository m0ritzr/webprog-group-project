import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useData } from "../context/dataContext";
import { fetchAnimals } from "../api/petfinder";
import { useEffect } from "react";

import SimpleBadge from "./subcomponents/SimpleBadge";

// TODO
// Format description, (&amp; etc...)
// The description isn't the full description?
// Add padding between badges

// Add check for duplicate matches/declines, also in a way that limits api calls...
// Figure out how to deal with animals without pictures while limiting the api calls...

function LikePage() {
  // eslint-disable-next-line no-unused-vars
  const { settings, setMatches, matches, setDeclined, declined } = useData();

  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // change to true
  const LIST_MIN = 10;

  const settingsForType = React.useMemo(
    () => ({ type: settings.type, ...settings[settings.type] }),
    [settings]
  );
  //console.log("settings for type:", settingsForType);
  console.log("matches: ", matches);
  console.log("loaded pets: ", pets);
  console.log("current page: ", currentPage);

  async function fetchMorePets() {
    const response = await fetchAnimals({
      ...settingsForType,
      page: currentPage,
    });
    console.log("fetched animals", response.animals);
    setPets([...pets, ...response.animals]);
    setCurrentPage(currentPage + 1);
  }

  // Fetches more animals if needed when pets is updated changes
  // Also called on first render
  useEffect(() => {
    pets.length ? setIsLoading(false) : setIsLoading(true);
    if (pets.length < LIST_MIN) {
      fetchMorePets();
    }
  }, [pets]);

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
            src={pets[0]?.photos[0]?.large || "./tmpimgs/no_image.jpg"}
          />
        )}

        <Card.Body className="h-25">
          <Card.Title>
            {isLoading ? "Loading..." : pets[0]?.name || "Pet name missing"}
          </Card.Title>
          <Card.Text>
            {isLoading
              ? "Loading..."
              : pets[0]?.description || "Description missing"}
          </Card.Text>
          {/** add padding between tags */}
          <Row>
            <Col>
              {
                pets[0]?.species ? (
                  <SimpleBadge
                    property={`${pets[0].species} - ${pets[0].breeds.primary}`}
                    icon="species"
                  />
                ) : null /** doesnt check both */
              }
              {pets[0]?.age ? (
                <SimpleBadge property={pets[0].age} icon="age" />
              ) : null}
              {pets[0]?.gender ? (
                <SimpleBadge property={pets[0].gender} icon="gender" />
              ) : null}
              {pets[0]?.size ? (
                <SimpleBadge property={pets[0].size} icon="size" />
              ) : null}
              {
                pets[0]?.contact ? (
                  <SimpleBadge
                    property={`${pets[0].contact.address.city}, ${pets[0].contact.address.state}`}
                    icon="address"
                  />
                ) : null /** doesnt check both */
              }
              {pets[0]?.tags.length > 0 ? (
                <SimpleBadge property={pets[0].tags.join(", ")} icon="tags" />
              ) : null}
            </Col>
          </Row>
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

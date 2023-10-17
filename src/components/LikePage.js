import React, { useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useData } from "../context/dataContext";
import { fetchAnimals } from "../api/petfinder";
import { useEffect } from "react";

import SimpleBadge from "./subcomponents/SimpleBadge";

// TODO
// The description isn't the full description?

// Add check for duplicate matches/declines, also in a way that limits api calls...
// Figure out how to deal with animals without pictures while limiting the api calls...

function LikePage() {
  // eslint-disable-next-line no-unused-vars
  const { settings, setMatches, matches, setDeclined, declined } = useData();

  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const LIST_MIN = 10;

  const settingsForType = React.useMemo(
    () => ({ type: settings.type, ...settings[settings.type] }),
    [settings]
  );

  useEffect(() => {
    async function fetchMorePets() {
      const response = await fetchAnimals({
        ...settingsForType,
        page: currentPage,
      });
      setPets([...pets, ...response.animals]);
      setCurrentPage(currentPage + 1);
    }

    pets.length ? setIsLoading(false) : setIsLoading(true);
    if (pets.length < LIST_MIN) {
      fetchMorePets();
    }
  }, [pets, currentPage, settingsForType]);

  function handleLikeClick() {
    if (pets.length) {
      if (!matches.includes(pets[0].id)) {
        setMatches([...matches, pets[0].id]);
      }
      setPets(pets.slice(1));
    }
  }
  function handleDislikeClick() {
    if (pets.length) {
      setDeclined([...declined, pets[0].id]);
      setPets(pets.slice(1));
    }
  }

  function petDesciption() {
    if (pets[0]?.description) {
      // Needs to run the decode twice.
      let tmp = decodeHTMLEntities(pets[0].description);
      return decodeHTMLEntities(tmp);
    } else {
      return "Description missing";
    }
  }

  function decodeHTMLEntities(text) {
    var txt = new DOMParser().parseFromString(text, "text/html");
    return txt.documentElement.textContent;
  }

  return (
    <div className="container-sm p-3">
      <h2>Like Pets</h2>

      <Card style={{ height: "90vh", maxWidth: "40vw" }}>
        {isLoading ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : (
          <Card.Img
            className="w-100 h-50 object-fit-cover"
            variant="top"
            src={pets[0]?.photos[0]?.large || "./tmpimgs/no_image.jpg"}
          />
        )}

        <Card.Body className="h-50">
          <Card.Title>
            {isLoading ? "Loading..." : pets[0]?.name || "Pet name missing"}
          </Card.Title>
          <Card.Text>{isLoading ? "Loading..." : petDesciption()}</Card.Text>
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
          <Row className="mt-20">
            <Button
              variant="success"
              size="lg"
              onClick={handleLikeClick}
              disabled={isLoading}
              className="mb-2"
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
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LikePage;

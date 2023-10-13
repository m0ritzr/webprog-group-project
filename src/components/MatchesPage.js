import { React, useEffect, useState } from "react";
import { Button, Card, Badge, Image, Row, Col, Modal } from "react-bootstrap";
import { useData } from "../dataContext";
import { fetchAnimal } from "../petfinder";
import { useToasts } from "../ToastContext";
import {
  FaVenusMars,
  FaPaw,
  FaBirthdayCake,
  FaTag,
  FaMapMarkerAlt,
  FaRuler,
} from "react-icons/fa";

function MatchesPage() {
  // eslint-disable-next-line no-unused-vars
  const { matches, declined, setMatches, setDeclined } = useData();
  const [loadedPetsData, setLoadedPetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedPetContact, setSelectedPetContact] = useState({});

  const { addToast } = useToasts();

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

  function handleUnmatch(e, match) {
    const newMatches = matches.filter((m) => m !== match.id);
    const newDeclined = [...declined, match.id];
    setMatches(newMatches);
    setDeclined(newDeclined);

    console.log("Unmatched with", match.name);

    addToast({
      id: `match-removed-${match.id}`,
      title: `Unmatched with ${match.name}`,
      message: `You have unmatched with ${match.name}`,
      type: "alert-success",
    });
  }

  function handleContactClick(petContact) {
    setSelectedPetContact(petContact);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="p-4">
      <h2>My Matches</h2>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        matches.map((match) => (
          <MatchCard
            key={match}
            petData={loadedPetsData[match]}
            handleUnmatch={handleUnmatch}
            handleContactClick={handleContactClick}
            handleCloseModal={handleCloseModal}
          />
        ))
      )}
      <ContactModal
        show={showModal}
        contact={selectedPetContact}
        onClose={handleCloseModal}
      />
    </div>
  );
}

function MatchCard({
  petData,
  handleUnmatch,
  handleContactClick,
  handleCloseModal,
}) {
  return (
    <Card
      className="mt-4 vw-75 d-flex flex-row justify-content-between"
      style={{ height: "250px" }}
    >
      <Image
        className="w-25 h-100 object-fit-cover p-2"
        src={petData.photos[0].medium}
        rounded
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <Row>
          <Col xs={6}>
            <Card.Title className="mb-2">{petData.name}</Card.Title>
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <Button
              variant="outline-primary"
              onClick={() => handleContactClick(petData.contact)}
              size="sm"
              style={{ marginRight: "3px" }}
            >
              Contact
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleUnmatch(petData)}
              size="sm"
              className="ml-2"
            >
              Unmatch
            </Button>
          </Col>
        </Row>

        <Card.Text className="mb-3 h-25">
          <p className="h-100">{petData.description}</p>
        </Card.Text>

        <Row>
          <Col className="d-flex flex-column align-items-left mb-2">
            <Badge variant="dark" className="mb-2">
              <FaPaw
                style={{ color: "white", marginRight: "5px" }}
                className="mr-1"
              />
              {petData.species} - {petData.breeds.primary}
            </Badge>
            <Badge variant="dark">
              <FaRuler
                style={{ color: "white", marginRight: "5px" }}
                className="mr-1"
              />
              {petData.size}
            </Badge>
          </Col>

          <Col className="d-flex flex-column align-items-left mb-2">
            <Badge variant="dark" className="mb-2">
              <FaBirthdayCake
                style={{ color: "white", marginRight: "5px" }}
                className="mr-1"
              />
              {petData.age}
            </Badge>
            <Badge variant="dark">
              <FaMapMarkerAlt
                style={{ color: "white", marginRight: "5px" }}
                className="mr-1"
              />
              {petData.contact.address.city}, {petData.contact.address.state}
            </Badge>
          </Col>

          <Col className="d-flex flex-column align-items-left mb-2">
            <Badge variant="dark" className="mb-2">
              <FaVenusMars
                style={{ color: "white", marginRight: "5px" }}
                className="mr-1"
              />
              {petData.gender}
            </Badge>
            {petData.tags.length ? (
              <Badge variant="dark">
                <FaTag
                  style={{ color: "white", marginRight: "5px" }}
                  className="mr-1"
                />
                {petData.tags.join(", ")}
              </Badge>
            ) : null}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function ContactModal({ show, contact, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contact.email && (
          <Row
            className="d-flex flex-row justify-content-between h-50"
            style={{ margin: "5px" }}
          >
            <span className="w-75">
              <strong>Email:</strong> {contact.email}
            </span>
            <Button
              variant="outline-primary"
              onClick={() => {
                window.location.href = `mailto:${contact.email}`;
              }}
              className="ml-2 w-25"
            >
              Send Email
            </Button>
          </Row>
        )}
        {contact.phone && (
          <Row
            className="d-flex flex-row justify-content-between h-50"
            style={{ margin: "5px" }}
          >
            <span className="w-75">
              <strong>Phone:</strong> {contact.phone}
            </span>
            <Button
              variant="outline-primary"
              onClick={() => {
                navigator.clipboard.writeText(contact.phone);
              }}
              className="ml-2 w-25"
            >
              Copy Phone
            </Button>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MatchesPage;

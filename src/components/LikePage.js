import React from "react";
import { Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";

function LikePage() {
  // eslint-disable-next-line no-unused-vars
  const { settings, setSettings, matches, setMatches } = useData();

  return (
    <div className="p-4">
      <h2>Like Pets</h2>
      <Card className="mt-4">
        <Card.Img variant="top" src="URL_OF_PET_IMAGE" />
        <Card.Body>
          <Card.Title>Pet Name</Card.Title>
          <Card.Text>Details about the pet.</Card.Text>
          <Button variant="success" size="lg" className="mr-2">
            Yes
          </Button>
          <Button variant="danger" size="lg">
            No
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LikePage;

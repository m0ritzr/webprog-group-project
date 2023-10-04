import React from "react";
import { ListGroup, Card } from "react-bootstrap";
import { useData } from "../dataContext";

function MatchesPage() {
  // eslint-disable-next-line no-unused-vars
  const { settings, setSettings, matches, setMatches } = useData();

  return (
    <div className="p-4">
      <h2>My Matches</h2>
      <Card className="mt-4">
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>Pet 1: Contact Details</ListGroup.Item>
            <ListGroup.Item>Pet 2: Contact Details</ListGroup.Item>
            {/* ... Other matched pets */}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MatchesPage;

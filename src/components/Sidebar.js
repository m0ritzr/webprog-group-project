import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Sidebar() {
  return (
    <div className="d-flex flex-column align-items-start p-3">
      <h5 className="mb-4">Navigation</h5>
      <ButtonGroup vertical>
        <LinkContainer to="/settings">
          <Button variant="outline-primary" className="mb-2">
            Filter/Settings
          </Button>
        </LinkContainer>
        <LinkContainer to="/like">
          <Button variant="outline-primary" className="mb-2">
            Like Pets
          </Button>
        </LinkContainer>
        <LinkContainer to="/matches">
          <Button variant="outline-primary" className="mb-2">
            My Matches
          </Button>
        </LinkContainer>
      </ButtonGroup>
    </div>
  );
}

export default Sidebar;

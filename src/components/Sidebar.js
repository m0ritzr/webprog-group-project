import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LogoutPopup from "./LogoutPopup";
import { useState } from "react";
import { useData } from "../dataContext";

function Sidebar() {
  const { setShowLogout } = useData();

  return (
    <div className="d-flex flex-column align-items-start p-3">
      <LogoutPopup />
      <h5 className="mb-4">Navigation</h5>
      <ButtonGroup vertical>
        <LinkContainer to="/settings">
          <Button variant="outline-primary" className="mb-2">
            Profile/Filters
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
        <LinkContainer to="/account-settings">
          <Button variant="outline-primary" className="mb-2">
            Account Settings
          </Button>
        </LinkContainer>
        <Button
          variant="outline-danger"
          className="mb-2"
          onClick={() => setShowLogout(true)}
        >
          Log out
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Sidebar;

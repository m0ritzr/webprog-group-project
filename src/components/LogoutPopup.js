import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useData } from "../dataContext";
import { CloseButton } from "react-bootstrap";

function LogoutPopup({ showPopup }) {
  const { showLogout, setShowLogout, isLoggedIn, setIsLoggedIn } = useData();
  const handleClose = () => setShowLogout(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogout(false);
  };

  return (
    <Modal show={showLogout}>
      <Modal.Header>
        <Modal.Title>Log out</Modal.Title>
        <CloseButton onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Log out
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutPopup;

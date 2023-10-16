import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useData } from "../../context/dataContext";
import { CloseButton } from "react-bootstrap";

function LogoutPopup(handleClose) {
  const { setIsLoggedIn } = useData();
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleClose();
  };

  return (
    <Modal>
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

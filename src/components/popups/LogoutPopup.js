import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useData } from "../../context/dataContext";
import { CloseButton } from "react-bootstrap";

function LogoutPopup({ show, onClose }) {
  const { setIsLoggedIn } = useData();
  const handleLogout = () => {
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Log out</Modal.Title>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
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

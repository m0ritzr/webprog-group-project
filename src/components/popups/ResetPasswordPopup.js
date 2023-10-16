import { CloseButton, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { auth } from "../../api/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPasswordPopup({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function handleResetPassword() {
    sendPasswordResetEmail(auth, email);
    setShowSuccessMessage(true);
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Create Account</Modal.Title>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Modal.Footer>
      {showSuccessMessage ? (
        <p>Check your email for a link to reset your password.</p>
      ) : null}
    </Modal>
  );
}

export default ResetPasswordPopup;

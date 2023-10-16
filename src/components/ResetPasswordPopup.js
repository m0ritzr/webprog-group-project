import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useData } from "../dataContext";
import { CloseButton } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPasswordPopup() {
  const { showPasswordReset, setShowPasswordReset } = useData();
  const [email, setEmail] = useState("");

  const handleClose = () => setShowPasswordReset(false);

  function handlePasswordReset() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        //console.log("reset email sent");
        setShowPasswordReset(false);
      })
      .catch((error) => {
        alert(error);
      });
    console.log("Reset Password");
  }

  return (
    <Modal show={showPasswordReset}>
      <Modal.Header>
        <Modal.Title>Create Account</Modal.Title>
        <CloseButton onClick={handleClose} />
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
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePasswordReset}>
          Send new password
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordPopup;

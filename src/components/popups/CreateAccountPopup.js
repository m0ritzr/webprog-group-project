import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useData } from "../../context/dataContext";
import { CloseButton } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { auth } from "../../api/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccountPopup({ show, onClose }) {
  const { setIsLoggedIn, setUid } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  function handleCreateAccount() {
    if (password !== rePassword) {
      alert("Passwords don't match");
    } else {
      createAccount();
    }
  }

  function createAccount() {
    //const auth = {auth};
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoggedIn(true);
        setUid(user.uid);
        // console.log(user); // log
        onClose();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode} : ${errorMessage}`);
      });
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
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Retype password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateAccount}>
          Create account
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateAccountPopup;

import React, { useState } from "react";
import { useData } from "../context/dataContext";
import { Button, Form, Container } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../api/firebase";
import { useToasts } from "../context/ToastContext";
import CreateAccountPopup from "./popups/CreateAccountPopup";
import ResetPasswordPopup from "./popups/ResetPasswordPopup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false);
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);
  const { setIsLoggedIn, setUid } = useData();
  const { addToast } = useToasts();

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      if (user) {
        setUid(user.uid); // <-- Use UID instead of email
        setIsLoggedIn(true);
      }
    } catch (error) {
      addToast({
        id: `login-failed-${Date.now()}`,
        title: `Error signing in`,
        message: error.message,
        type: "alert-danger",
      });
      console.error("Error signing in:", error.message);
    }
  };

  function handleKeyPress(target) {
    if (target.key === "Enter") {
      handleLogin();
    }
  }

  function handleCloseCreateAccount() {
    setShowCreateAccountPopup(false);
  }

  function handleCloseResetPassword() {
    setShowResetPasswordPopup(false);
  }

  return (
    <>
      {showResetPasswordPopup ? (
        <ResetPasswordPopup
          show={showResetPasswordPopup}
          onClose={handleCloseResetPassword}
        />
      ) : null}
      {showCreateAccountPopup ? (
        <CreateAccountPopup
          show={showCreateAccountPopup}
          onClose={handleCloseCreateAccount}
        />
      ) : null}
      <Container className="mt-5">
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
              onKeyDown={(e) => handleKeyPress(e)}
            />
          </Form.Group>
          <Button className="me-3 mt-3" variant="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button
            className="me-3 mt-3"
            variant="secondary"
            onClick={(e) => setShowCreateAccountPopup(true)}
          >
            Create account
          </Button>
          <Button
            className="me-3 mt-3"
            variant="secondary"
            onClick={(e) => setShowResetPasswordPopup(true)}
          >
            Reset Password
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;

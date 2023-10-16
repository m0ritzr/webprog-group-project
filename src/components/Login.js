import React, { useState } from "react";
import { useData } from "../dataContext";
import {
  Button,
  Form,
  Container,
  Col,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { useToasts } from "../ToastContext";
import CreateAccountPopup from "./CreateAccountPopup";
import ResetPasswordPopup from "./ResetPasswordPopup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUid, setShowCreateAccount, setShowPasswordReset } =
    useData();
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

  function handleCreateAccountClick() {
    setShowCreateAccount(true);
  }

  function handlePasswordReset() {
    setShowPasswordReset(true);
  }

  return (
    <Container className="mt-5">
      <ResetPasswordPopup />
      <CreateAccountPopup />
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
          className="mt-3 me-3"
          variant="secondary"
          onClick={handleCreateAccountClick}
        >
          Create account
        </Button>
        <Button
          className="mt-3"
          variant="secondary"
          onClick={handlePasswordReset}
        >
          Reset Password
        </Button>
      </Form>
    </Container>
  );
}

export default Login;

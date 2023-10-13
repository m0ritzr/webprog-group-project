import React, { useState } from "react";
import { useData } from "../dataContext";
import { Button, Form, Container } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { useToasts } from "../ToastContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
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
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;

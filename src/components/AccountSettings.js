import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth } from "../firebase";
import { updatePassword } from "firebase/auth";

function AccountSettings() {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  function handlePasswordChange() {
    if (password !== rePassword) {
      alert("Passwords don't match");
    } else {
      const user = auth.currentUser;
      updatePassword(user, password)
        .then(() => {
          console.log("password updated"); // log
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  return (
    <div className="container-sm p-3">
      <h2>Settings</h2>
      <h4>Change Password</h4>
      <Form>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Retype passwore</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button className="mt-3" onClick={handlePasswordChange}>
        Change Password
      </Button>
    </div>
  );
}

export default AccountSettings;

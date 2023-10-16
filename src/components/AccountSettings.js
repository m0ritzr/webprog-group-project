import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth } from "../api/firebase";
import { updatePassword, deleteUser } from "firebase/auth";
import { useData } from "../context/dataContext";

function AccountSettings() {
  const { setIsLoggedIn } = useData();
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

  function handleDeleteUser() {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
      setIsLoggedIn(false);
    });
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
          <Form.Label>Enter Password Again</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="vstack gap-3 col-md-2">
        <Button className="mt-3" onClick={handlePasswordChange}>
          Change Password
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default AccountSettings;

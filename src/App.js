import React from "react";
import Sidebar from "./components/Sidebar";
import { useData } from "./context/dataContext";
import Login from "./components/Login";
import { Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LogoutPopup from "./components/popups/LogoutPopup";

function App() {
  const { isLoggedIn, isAnimalTypesDictInitialized } = useData();
  const navigation = useNavigation();

  const [showLogoutPopup, setShowLogoutPopup] = React.useState(false);

  function handleCloseLogoutPopup() {
    setShowLogoutPopup(false);
  }

  function handleShowLogoutPopup() {
    setShowLogoutPopup(true);
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  const isLoading = navigation.state === "loading";

  return (
    <div className="d-flex">
      <LogoutPopup show={showLogoutPopup} onClose={handleCloseLogoutPopup} />
      <div style={{ flex: "0 0 20%" }}>
        <Sidebar showLogout={handleShowLogoutPopup} />
      </div>
      <div style={{ flex: "1" }}>
        {isLoading || !isAnimalTypesDictInitialized ? <Spinner /> : <Outlet />}
      </div>
    </div>
  );
}

export default App;

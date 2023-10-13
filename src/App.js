import React from "react";
import Sidebar from "./components/Sidebar";
import { useData } from "./dataContext";
import Login from "./components/Login";
import { Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function App() {
  const { isLoggedIn, isAnimalTypesDictInitialized } = useData();
  const navigation = useNavigation();

  if (!isLoggedIn) {
    return <Login />;
  }

  const isLoading = navigation.state === "loading";

  return (
    <div className="d-flex">
      <div style={{ flex: "0 0 20%" }}>
        <Sidebar />
      </div>
      <div style={{ flex: "1" }}>
        {isLoading || !isAnimalTypesDictInitialized ? <Spinner /> : <Outlet />}
      </div>
    </div>
  );
}

export default App;

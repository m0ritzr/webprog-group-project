import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SettingsPage from "./components/SettingsPage";
import LikePage from "./components/LikePage";
import MatchesPage from "./components/MatchesPage";
import { useData } from "./dataContext";
import Login from "./components/Login";

function App() {
  const { isLoggedIn } = useData();

  if (!isLoggedIn) {
      return <Login />;
  }

  return (
      <Router>
        <div className="d-flex">
          <div style={{ flex: "0 0 20%" }}>
            <Sidebar />
          </div>
          <div style={{ flex: "1" }}>
            <Routes>
              <Route path="/filter" element={<SettingsPage />} />
              <Route path="/like" element={<LikePage />} />
              <Route path="/matches" element={<MatchesPage />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;

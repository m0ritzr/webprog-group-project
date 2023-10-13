import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LikePage from "./components/LikePage";
import SettingsPage from "./components/SettingsPage";
import MatchesPage from "./components/MatchesPage";
import Login from "./components/Login";
import Filter from "./components/Filter";
import Profile from "./components/Profile";

import { useData } from "./dataContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useData();

  return isLoggedIn ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <div className="p-4">
              <h2>Welcome!</h2>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "filter/:animalType/",
            element: <Filter />,
          },
        ],
      },
      {
        path: "like",
        element: (
          <ProtectedRoute>
            <LikePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "matches",
        element: (
          <ProtectedRoute>
            <MatchesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <div className="p-4">
            <h2>Page not found</h2>
          </div>
        ),
      },
    ],
  },
]);

export default router;

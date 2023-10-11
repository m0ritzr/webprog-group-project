import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LikePage from "./components/LikePage";
import SettingsPage from "./components/SettingsPage";
import MatchesPage from "./components/MatchesPage";
import Login from "./components/Login";
import { fetchAnimalTypes } from "./petfinder";
import { useData } from "./dataContext";
import { Navigate } from "react-router-dom";

async function animalTypeDictLoader() {
    const fetchedAnimalTypes = await fetchAnimalTypes();
    
    const animalTypeDict = fetchedAnimalTypes.types.reduce((acc, animalTypeObj) => {
        acc[animalTypeObj.name] = animalTypeObj;
        return acc;
    }, {});

    return animalTypeDict;
}

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
        loader: animalTypeDictLoader,
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
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

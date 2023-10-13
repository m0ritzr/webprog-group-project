import { useData } from "../dataContext";
import { Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function SettingsPage() {
  const { animalTypesDict } = useData();

  console.log(animalTypesDict);
  console.log(animalTypesDict.Dog);
  console.log(Object.keys(animalTypesDict));

  return (
    <div className="p-4">
      <h2>Profile and Filters</h2>
      <SettingsNav dict={animalTypesDict} />
      <Outlet />
    </div>
  );
}

function SettingsNav({ dict }) {
  return (
    <Nav variant="tabs" defaultActiveKey="/profile">
      <Nav.Item>
        <LinkContainer to="/settings/profile">
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      {Object.keys(dict).map((animalType) => (
        <Nav.Item>
          <LinkContainer to={"/settings/filter/" + animalType}>
            <Nav.Link>{animalType}</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ))}
    </Nav>
  );
}

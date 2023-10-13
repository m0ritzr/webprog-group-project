import { useData } from "../dataContext";
import { Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useToasts } from "../ToastContext";

export default function SettingsPage() {
  const { animalTypesDict, settings, setSettings } = useData();
  const [selectedType, setSelectedType] = useState(settings.type || "");
  const { addToast } = useToasts();

  console.log(animalTypesDict);
  console.log(animalTypesDict.Dog);
  console.log(Object.keys(animalTypesDict));

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSettings({ ...settings, type });

    addToast({
      id: `type-changed-${type}-${Date.now()}`,
      title: `Type changed to ${type}`,
      message: `Successfully changed type to ${type}`,
      type: "alert-success",
    });

    console.log(`Selected type: ${type}`);
  };

  return (
    <div className="p-4">
      <h2>Profile and Filters</h2>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-animal-type">
          {selectedType || "Select an animal type"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(animalTypesDict).map((animalType) => (
            <Dropdown.Item
              key={animalType}
              onClick={() => handleTypeChange(animalType)}
            >
              {animalType}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <SettingsNav dict={animalTypesDict} />
      <Outlet />
    </div>
  );
}

function SettingsNav({ dict }) {
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/profile">
        <Nav.Item>
          <LinkContainer to="/settings/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {Object.keys(dict).map((animalType) => (
          <Nav.Item key={animalType}>
            <LinkContainer to={"/settings/filter/" + animalType}>
              <Nav.Link>{animalType}</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

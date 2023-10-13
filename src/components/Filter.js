import { React, useState } from "react";
import {
  Form,
  Button,
  Accordion,
  AccordionItem,
  AccordionHeader,
  Row,
  Col,
} from "react-bootstrap";
import { useData } from "../dataContext";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { useParams } from "react-router";

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

export default function Filter() {
  const { settings, setSettings, animalTypesDict } = useData();

  console.log("animal types dict:", animalTypesDict);

  const type = useParams().animalType;

  const animalType = animalTypesDict[type];

  const [selectedBreeds, setSelectedBreeds] = useState(settings.breed || []);
  const [selectedSizes, setSelectedSizes] = useState(settings.size || []);
  const [selectedGenders, setSelectedGenders] = useState(settings.gender || []);
  const [selectedAges, setSelectedAges] = useState(settings.age || []);
  const [selectedColors, setSelectedColors] = useState(settings.color || []);
  const [selectedCoats, setSelectedCoats] = useState(settings.coat || []);
  const [selectedAttributes, setSelectedAttributes] = useState(
    settings.attributes || []
  );

  const settersMap = {
    breed: setSelectedBreeds,
    size: setSelectedSizes,
    gender: setSelectedGenders,
    age: setSelectedAges,
    color: setSelectedColors,
    coat: setSelectedCoats,
    attributes: setSelectedAttributes,
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const setter = settersMap[name]; // get the corresponding setter
    setter((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const selectAll = (e) => {
    const { name, value } = e.target;
    const setter = settersMap[name]; // get the corresponding setter

    value ? setter({ ...animalType.breeds }) : setter([]);
  };

  console.log(JSON.stringify(settings));

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct the settings object:
    const updatedType = {
      breed: selectedBreeds,
      size: selectedSizes,
      gender: selectedGenders,
      age: selectedAges,
      color: selectedColors,
      coat: selectedCoats,
      attributes: selectedAttributes,
    };

    const updatedSettings = { ...settings, type: updatedType };

    // Update the settings in the context:
    console.log(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Accordion defaultActiveKey="breeds">
        <AccordionItem eventKey="breeds">
          <Accordion.Header>Breeds</Accordion.Header>
          <AccordionBody>
            <Form.Group>
              <Form.Check
                type="switch"
                name="breed"
                label="Select all breeds"
                reverse
                onChange={selectAll}
              />
              <Row md={4}>
                {animalType.breeds.map((breed) => (
                  <Col>
                    <Form.Check
                      type="checkbox"
                      name="breed"
                      id={animalType + "-" + breed}
                      label={breed}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="sizes">
          <Accordion.Header>Sizes</Accordion.Header>
          <AccordionBody>
            {/* select for sizes */}
            <Form.Group>
              <Form.Label>Sizes</Form.Label>
              {["small", "medium", "large", "xlarge"].map((size) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(size.replace("_", " "))}
                  name="size"
                  value={size}
                  defaultChecked={selectedSizes.includes(size)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="genders">
          <AccordionHeader>Genders</AccordionHeader>
          <AccordionBody>
            {/* select for gender */}
            <Form.Group>
              <Form.Label>Genders</Form.Label>
              {animalType.genders.map((gender) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(gender.replace("_", " "))}
                  name="gender"
                  value={gender}
                  defaultChecked={selectedGenders.includes(gender)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="ages">
          <AccordionHeader>Ages</AccordionHeader>
          <AccordionBody>
            {/* select for age */}
            <Form.Group>
              <Form.Label>Ages</Form.Label>
              {["baby", "young", "adult", "senior"].map((age) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(age.replace("_", " "))}
                  name="age"
                  value={age}
                  defaultChecked={selectedAges.includes(age)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>

            {/* select for color */}
            <Form.Group>
              <Form.Label>Colors</Form.Label>
              {animalType.colors.map((color) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(color.replace("_", " "))}
                  name="color"
                  value={color}
                  defaultChecked={selectedColors.includes(color)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="coats">
          <AccordionHeader>Coats</AccordionHeader>
          <AccordionBody>
            {/* select for coat */}
            <Form.Group>
              <Form.Label>Coats</Form.Label>
              {animalType.coats.map((coat) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(coat.replace("_", " "))}
                  name="coat"
                  value={coat}
                  defaultChecked={selectedCoats.includes(coat)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="attributes">
          <AccordionHeader>Attributes</AccordionHeader>
          <AccordionBody>
            {/* select for attributes */}
            <Form.Group>
              <Form.Label>Attributes</Form.Label>
              {["spayed_neutered", "house_trained", "special_needs"].map(
                (attribute) => (
                  <Form.Check
                    type="checkbox"
                    label={toTitleCase(attribute.replace("_", " "))}
                    name="attributes"
                    value={attribute}
                    defaultChecked={selectedAttributes.includes(attribute)}
                    onChange={handleCheckboxChange}
                  />
                )
              )}
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
      </Accordion>

      <Button variant="primary" type="submit" className="mt-3">
        Apply Filters
      </Button>
    </Form>
  );
}

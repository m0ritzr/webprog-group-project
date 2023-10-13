import { React, useEffect, useState } from "react";
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
import { useToasts } from "../ToastContext";

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

  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCoats, setSelectedCoats] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    const typeSettings = settings[type] || {};

    setSelectedBreeds(typeSettings.breed || []);
    setSelectedSizes(typeSettings.size || []);
    setSelectedGenders(typeSettings.gender || []);
    setSelectedAges(typeSettings.age || []);
    setSelectedColors(typeSettings.color || []);
    setSelectedCoats(typeSettings.coat || []);
    setSelectedAttributes(typeSettings.attributes || []);
  }, [settings, type]);

  const { addToast } = useToasts();

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
    const setter = settersMap[name];
    setter((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const selectAll = (e) => {
    const { name, checked } = e.target;
    const setter = settersMap[name];
    checked ? setter([...animalType.breeds]) : setter([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedTypeSettings = {
      breed: selectedBreeds,
      size: selectedSizes,
      gender: selectedGenders,
      age: selectedAges,
      color: selectedColors,
      coat: selectedCoats,
      attributes: selectedAttributes,
    };
    const updatedSettings = { ...settings, [type]: updatedTypeSettings };
    setSettings(updatedSettings);

    addToast({
      id: `settings-updated-${Date.now()}`,
      title: `Settings updated`,
      message: `Successfully updated settings for ${type}`,
      type: "alert-success",
    });

    console.log("updated settings:", updatedSettings);
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
                      value={breed}
                      label={breed}
                      checked={selectedBreeds.includes(breed)}
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
                  checked={selectedSizes.includes(size)}
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
                  checked={selectedGenders.includes(gender)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="ages">
          <AccordionHeader>Ages</AccordionHeader>
          <AccordionBody>
            <Form.Group>
              <Form.Label>Ages</Form.Label>
              {["baby", "young", "adult", "senior"].map((age) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(age.replace("_", " "))}
                  name="age"
                  value={age}
                  checked={selectedAges.includes(age)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="colors">
          <AccordionHeader>Colors</AccordionHeader>
          <AccordionBody>
            <Form.Group>
              <Form.Label>Colors</Form.Label>
              {animalType.colors.map((color) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(color.replace("_", " "))}
                  name="color"
                  value={color}
                  checked={selectedColors.includes(color)}
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
                  checked={selectedCoats.includes(coat)}
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
                    checked={selectedAttributes.includes(attribute)}
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

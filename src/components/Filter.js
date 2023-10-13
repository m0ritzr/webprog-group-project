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

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const typeSettings = settings[type] || {};

    setSelectedBreeds(typeSettings.breed || []);
    setSelectedSizes(typeSettings.size || []);
    setSelectedGenders(typeSettings.gender || []);
    setSelectedAges(typeSettings.age || []);
    setSelectedColors(typeSettings.color || []);
    setSelectedCoats(typeSettings.coat || []);
    setSelectedAttributes(typeSettings.attributes || []);
    setSelectedCategories(typeSettings.selectedCategories || []);
  }, [settings, type]);

  const settersMap = {
    breed: setSelectedBreeds,
    size: setSelectedSizes,
    gender: setSelectedGenders,
    age: setSelectedAges,
    color: setSelectedColors,
    coat: setSelectedCoats,
    attributes: setSelectedAttributes,
    categories: setSelectedCategories,
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

  const selectCategory = (e) => {
    const { name, checked } = e.target;
    const setter = settersMap["categories"];
    checked ? setSelectedCategories([...selectedCategories, name]) : setter([selectedCategories.filter(category => category === name)]);
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
      categories: selectedCategories
    };
    const updatedSettings = { ...settings, [type]: updatedTypeSettings };
    setSettings(updatedSettings);
    console.log("updated settings:", updatedSettings);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Accordion defaultActiveKey="breeds">

        {/* select for breeds */}
        <AccordionItem eventKey="breeds">
          <Accordion.Header>Breeds</Accordion.Header>
          <AccordionBody>
            <Form.Group>
              <Form.Check
                type="switch"
                name="breeds"
                label="Select all breeds"
                reverse
                checked={selectedCategories.includes("breeds")}
                onChange={selectCategory}
              />
              <Row md={4}>
                {animalType.breeds.map((breed) => (
                  <Col>
                    <Form.Check
                      type="checkbox"
                      name="breed"
                      value={breed}
                      label={breed}
                      disabled={selectedCategories.includes("breeds")}
                      checked={selectedBreeds.includes(breed)}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </AccordionBody>
        </AccordionItem>

        {/* select for sizes */}
        <AccordionItem eventKey="sizes">
          <Accordion.Header>Sizes</Accordion.Header>
          <AccordionBody>
            <Form.Group>
              <Form.Check
                type="switch"
                name="sizes"
                label="Select all sizes"
                reverse
                checked={selectedCategories.includes("sizes")}
                onChange={selectCategory}
              />
              <Row md={4}>
                {["small", "medium", "large", "xlarge"].map((size) => (
                  <Form.Check
                    type="checkbox"
                    label={toTitleCase(size.replace("_", " "))}
                    name="size"
                    disabled={selectedCategories.includes("sizes")}
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Row>
            </Form.Group>
          </AccordionBody>
        </AccordionItem>
        {/* select for gender */}
        <AccordionItem eventKey="genders">
          <AccordionHeader>Genders</AccordionHeader>
          <AccordionBody>
            <Form.Group>
              <Form.Check
                type="switch"
                name="genders"
                label="Select all genders"
                reverse
                checked={selectedCategories.includes("genders")}
                onChange={selectCategory}
              />
              <Row md={4}>
                {animalType.genders.map((gender) => (
                  <Form.Check
                    type="checkbox"
                    label={toTitleCase(gender.replace("_", " "))}
                    name="gender"
                    disabled={selectedCategories.includes("genders")}
                    value={gender}
                    checked={selectedGenders.includes(gender)}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Row>
            </Form.Group>

          </AccordionBody>
        </AccordionItem>

        {/* select for ages */}
        <AccordionItem eventKey="ages">
          <AccordionHeader>Ages</AccordionHeader>
          <AccordionBody>
            <Form.Group>

              <Form.Check
                type="switch"
                name="ages"
                label="Select all ages"
                reverse
                checked={selectedCategories.includes("ages")}
                onChange={selectCategory}
              />
              <Row md={4}>
                {["baby", "young", "adult", "senior"].map((age) => (
                  <Form.Check
                    type="checkbox"
                    label={toTitleCase(age.replace("_", " "))}
                    name="age"
                    disabled={selectedCategories.includes("ages")}
                    value={age}
                    checked={selectedAges.includes(age)}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Row>
            </Form.Group>
          </AccordionBody>
        </AccordionItem>

        {/* select for colours */}
        <AccordionItem eventKey="colors">
          <AccordionHeader>Colors</AccordionHeader>
          <AccordionBody>
            <Form.Group>
              <Form.Check
                type="switch"
                name="colours"
                label="Select all colours"
                reverse
                checked={selectedCategories.includes("colours")}
                onChange={selectCategory}
              />
              <Row md={4}>
                {animalType.colors.map((color) => (
                  <Form.Check
                    type="checkbox"
                    label={toTitleCase(color.replace("_", " "))}
                    name="color"
                    disabled={selectedCategories.includes("colours")}
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Row>
            </Form.Group>
          </AccordionBody>
        </AccordionItem>

        {/* select for coat */}
        <AccordionItem eventKey="coats">
          <AccordionHeader>Coats</AccordionHeader>
          <AccordionBody>
            <Form.Group>
              <Form.Check
                type="switch"
                name="coats"
                label="Select all coats"
                reverse
                checked={selectedCategories.includes("coats")}
                onChange={selectCategory}
              />
              <Row md={4}>
                {animalType.coats.map((coat) => (
                  <Form.Check
                    type="checkbox"
                    label={toTitleCase(coat.replace("_", " "))}
                    name="coat"
                    disabled={selectedCategories.includes("coats")}
                    value={coat}
                    checked={selectedCoats.includes(coat)}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Row>
            </Form.Group>
          </AccordionBody>
        </AccordionItem>

        {/* select for attributes */}
        <AccordionItem eventKey="attributes">
          <AccordionHeader>Attributes</AccordionHeader>
          <AccordionBody>
            <Form.Group>
              <Form.Check
                type="switch"
                name="attributes"
                label="Select all attributes"
                reverse
                checked={selectedCategories.includes("attributes")}

                onChange={selectCategory}
              />
              <Row md={4}>
                {["spayed_neutered", "house_trained", "special_needs"].map(
                  (attribute) => (
                    <Form.Check
                      type="checkbox"
                      label={toTitleCase(attribute.replace("_", " "))}
                      name="attributes"
                      disabled={selectedCategories.includes("attributes")}
                      value={attribute}
                      checked={selectedAttributes.includes(attribute)}
                      onChange={handleCheckboxChange}
                    />
                  )
                )}
              </Row>
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

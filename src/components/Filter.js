import { React, useEffect, useState } from "react";
import { Form, Button, Accordion, Row, Col } from "react-bootstrap";
import { useData } from "../dataContext";
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

  const settersMap = {
    breed: setSelectedBreeds,
    size: setSelectedSizes,
    gender: setSelectedGenders,
    age: setSelectedAges,
    color: setSelectedColors,
    coat: setSelectedCoats,
    attributes: setSelectedAttributes,
  };

  const filterArraysMap = {
    breed: animalType.breeds,
    size: ["small", "medium", "large", "xlarge"],
    gender: animalType.genders,
    age: ["baby", "young", "adult", "senior"],
    color: animalType.colors,
    coat: animalType.coats,
    attributes: ["spayed_neutered", "house_trained", "special_needs"],
  };

  console.log("filter arrays map:", filterArraysMap);

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

  function selectAll(filterKey, checked) {
    const setter = settersMap[filterKey];
    console.log("Key:", filterKey);
    console.log(filterArraysMap[filterKey]);
    checked ? setter([...filterArraysMap[filterKey]]) : setter([]);
  }

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
    console.log("updated settings:", updatedSettings);
  };

  console.log("animal type:", animalType);

  return (
    <Form onSubmit={handleFormSubmit}>
      <Accordion defaultActiveKey="breed">
        <FilterAccordionItem
          filtersArray={filterArraysMap.breed}
          filterKey="breed"
          label="Breeds"
          selectedFilters={selectedBreeds}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
        <FilterAccordionItem
          filtersArray={filterArraysMap.size}
          filterKey="size"
          label="Sizes"
          selectedFilters={selectedSizes}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
        <FilterAccordionItem
          filtersArray={filterArraysMap.gender}
          filterKey="gender"
          label="Genders"
          selectedFilters={selectedGenders}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
        <FilterAccordionItem
          filtersArray={filterArraysMap.age}
          filterKey="age"
          label="Ages"
          selectedFilters={selectedAges}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
        <FilterAccordionItem
          filtersArray={filterArraysMap.color}
          filterKey="color"
          label="Colors"
          selectedFilters={selectedColors}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
        <FilterAccordionItem
          filtersArray={filterArraysMap.coat}
          filterKey="coat"
          label="Coats"
          selectedFilters={selectedCoats}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
        <FilterAccordionItem
          filtersArray={filterArraysMap.attributes}
          filterKey="attributes"
          label="Attributes"
          selectedFilters={selectedAttributes}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
        />
      </Accordion>

      <Button variant="primary" type="submit" className="mt-3">
        Apply Filters
      </Button>
    </Form>
  );
}

function FilterAccordionItem({
  filtersArray,
  filterKey,
  label,
  selectedFilters,
  handleCheckboxChange,
  selectAll,
}) {
  return (
    <>
      {filtersArray && filtersArray.length ? (
        <Accordion.Item eventKey={filterKey}>
          <Accordion.Header>{label}</Accordion.Header>
          <Accordion.Body>
            <Form.Group>
              <Form.Check
                type="switch"
                name={filterKey}
                label={`Select all ${label}`}
                reverse
                checked={arraysEqual(filtersArray, selectedFilters)}
                onChange={(e) => selectAll(filterKey, e.target.checked)}
              />
              <Row md={4}>
                {filtersArray.map((value) => (
                  <Col>
                    <Form.Check
                      type="checkbox"
                      name={filterKey}
                      value={value}
                      label={toTitleCase(value.replace("_", " "))}
                      checked={selectedFilters.includes(value)}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      ) : null}{" "}
    </>
  );
}

function arraysEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.sort().every((value, index) => value === arr2.sort()[index])
  );
}

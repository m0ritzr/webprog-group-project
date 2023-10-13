import { React, useContext, useParams, useState } from "react";

import { Form, Button, Row, Col, Accordion } from "react-bootstrap";

import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionBody from "react-bootstrap/AccordionBody";

import { useData } from "../dataContext";

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
  const { settings, setSettings } = useData();

  const { animalType } = useParams();
  const { animalTypesDict } = useContext();

  const [selectedBreeds, setSelectedBreeds] = useState(settings.breed || []);
  const [selectedSizes, setSelectedSizes] = useState(settings.size || []);
  const [selectedGenders, setSelectedGenders] = useState(settings.gender || []);
  const [selectedAges, setSelectedAges] = useState(settings.age || []);
  const [selectedColors, setSelectedColors] = useState(settings.color || []);
  const [selectedCoats, setSelectedCoats] = useState(settings.coat || []);
  const [selectedAttributes, setSelectedAttributes] = useState(
    settings.attributes || [],
  );


  const [activeFilter, setActiveFilter] = useState();

  const settersMap = {
    breed: setSelectedBreeds,
    size: setSelectedSizes,
    gender: setSelectedGenders,
    age: setSelectedAges,
    color: setSelectedColors,
    coat: setSelectedCoats,
    attributes: setSelectedAttributes,
  };
  function handleActiveFilter(e) {
    setActiveFilter(e.target.name)
  }
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
    // const { name, value } = e.target;
    // const setter = settersMap[name]; // get the corresponding setter

    // value ? setter( { ...animalTypesDict[type][name]} ) : setter([]);
  };

  console.log(JSON.stringify(settings));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Construct the settings object:
    const updatedType = {
      //type: selectedType,
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

    <Accordion defaultActiveKey="" handleActiveFilter={handleActiveFilter}>
      <AccordionItem eventKey="Breeds">
        <AccordionHeader>
          Breeds
        </AccordionHeader>
        <AccordionBody>
          <Form.Check
            reverse
            label="Select all breeds"
            name="all-breeds"
            type="reverse-checkbox"
            id={"all-breeds"}
          />

          <div className="row row-cols-3">
            {animalTypesDict[animalType].breeds.map(breed =>
              <div className="col p-1" key={breed}>

                <Form.Check // prettier-ignore
                  type={breed}
                  id={`${breed}`}
                  name={breed }
                  label={breed}
                  onChange={setSelectedBreeds}
                />
              </div>
            )};
          </div>
        </AccordionBody>
      </AccordionItem>

      <Accordion.Item>
        <Accordion.Body>

          <Form>
            {/* select for breeds */}
            <Form.Group>
              <Form.Check
                type="switch"
                name="breed"
                label="Select all breeds"
                reverse
                onChange={selectAll}
              />
              <Row md={4}>
                {animalTypesDict[animalType].breeds.map(breed =>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id={breed}
                      label={breed}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                )};
              </Row>
            </Form.Group>

            {/* select for sizes */}
            <Form.Group>
              <Form.Check
                type="switch"
                name="size"
                label="Select all sizes"
                reverse
                onChange={selectAll}
              />
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

            {/* select for gender */}
            <Form.Group>
              <Form.Label>Genders</Form.Label>
              {animalTypesDict[animalType].genders.map((gender) => (
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
              {animalTypesDict[animalType].colors.map((color) => (
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

            {/* select for coat */}
            <Form.Group>
              <Form.Label>Coats</Form.Label>
              {animalTypesDict[animalType].coats.map((coat) => (
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
                ),
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Apply Filters
            </Button>

          </Form>

        </Accordion.Body>
      </Accordion.Item >
    </Accordion>



  );
}

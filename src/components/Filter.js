import { React, useContext, useParams, useState } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
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

  const type = useParams();
  const typeFilters = useContext(); 

  const [selectedBreeds, setSelectedBreeds] = useState(settings.breed || []);
  const [selectedSizes, setSelectedSizes] = useState(settings.size || []);
  const [selectedGenders, setSelectedGenders] = useState(settings.gender || []);
  const [selectedAges, setSelectedAges] = useState(settings.age || []);
  const [selectedColors, setSelectedColors] = useState(settings.color || []);
  const [selectedCoats, setSelectedCoats] = useState(settings.coat || []);
  const [selectedAttributes, setSelectedAttributes] = useState(
    settings.attributes || [],
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
    
    value ? setter( { ...typeFilters.breeds} ) : setter([]);
  };

  console.log(JSON.stringify(settings));

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct the settings object:
    const updatedType = {
      type: selectedType,
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
                      {animalType.breeds.map(breed =>
                        <Col>
                          <Form.Check
                            type="checkbox"
                            id={animalType + '-' + breed}
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
                    {animalTypeDict[selectedType].genders.map((gender) => (
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
                    {animalTypeDict[selectedType].colors.map((color) => (
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
                    {animalTypeDict[selectedType].coats.map((coat) => (
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
  
                  <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Enter US postal code"
                      defaultValue={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      pattern="^\d{5}$" // A basic regex pattern for 5-digit US postal code
                    />
                  </Form.Group>
  
                  <Form.Group>
                    <Form.Label>Distance: max {selectedDistance} miles</Form.Label>
                    <Form.Control
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      name="distance"
                      value={selectedDistance}
                      onChange={(e) => setSelectedDistance(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Slide to adjust the distadnce range.
                    </Form.Text>
                  </Form.Group>
  
                  <Button variant="primary" type="submit" className="mt-3">
                    Apply Filters
                  </Button>
  
                </Form>
  
              </Accordion.Body>
            </Accordion.Item>
  
          </div>
  
        )};
  
      </Accordion>
  
    );
  }
  
  function oldBreedFilter(animalTypesDict, onChangeBreed) {
  
    return (
      <Accordion defaultActiveKey="">
  
        {Object.keys(animalTypesDict).map(animalType =>
          <div key={animalType}>
            <Accordion.Item eventKey={animalType}>
              <Accordion.Header>{animalType}</Accordion.Header>
              <Accordion.Body>
  
                <div className="form-check form-switch form-check-reverse" key="all-breeds">
                  <input className="form-check-input" name="all-breeds" type="checkbox" id="all-breeds" onChange={onChangeBreed} />
                  <label className="form-check-label" htmlFor="all-breeds">
                    <h6>Select all breeds</h6>
                  </label>
                </div>
  
                <div className="row row-cols-3">
                  {breeds.map(breed =>
                    <div className="col p-1" key={breed}>
  
                      <Form.Check // prettier-ignore
                        type={breed}
                        id={`${breed}`}
                        name={animalType + "/" + breed}
                        label={` ${breed}`}
                        onChange={onChangeBreed}
                      />
                    </div>
                  )};
                </div>
              </Accordion.Body>
            </Accordion.Item>
  
          </div>
  
        )};
  
      </Accordion>
    );
  
  }
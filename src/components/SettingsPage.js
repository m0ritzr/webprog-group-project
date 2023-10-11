import { React, useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";
import { useLoaderData } from "react-router";
import { fetchAnimalBreeds } from "../petfinder";

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

function SettingsPage() {
  const { settings, setSettings } = useData();
  const animalTypeDict = useLoaderData();
  const [availableBreeds, setAvailableBreeds] = useState([]);

  const [selectedType, setSelectedType] = useState(settings.type || "Cat");
  const [selectedBreeds, setSelectedBreeds] = useState(settings.breed || []);
  const [selectedSizes, setSelectedSizes] = useState(settings.size || []);
  const [selectedGenders, setSelectedGenders] = useState(settings.gender || []);
  const [selectedAges, setSelectedAges] = useState(settings.age || []);
  const [selectedColors, setSelectedColors] = useState(settings.color || []);
  const [selectedCoats, setSelectedCoats] = useState(settings.coat || []);
  const [selectedAttributes, setSelectedAttributes] = useState(settings.attributes || []);
  const [selectedLocation, setSelectedLocation] = useState(settings.location || "10001");
  const [selectedDistance, setSelectedDistance] = useState(settings.distance || "100");

  useEffect(() => {
    async function fetchBreeds() {
      const animalBreedsObj = await fetchAnimalBreeds(selectedType);
      const animalBreeds = animalBreedsObj.breeds.map((breedObj) => breedObj.name)
      console.log(animalBreeds);
      setAvailableBreeds(animalBreeds);
    }
    fetchBreeds();
  }, [selectedType]);

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
    const setter = settersMap[name];  // get the corresponding setter
    setter(prevState => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter(item => item !== value);
      }
    });
  };

  console.log(animalTypeDict)

  console.log(JSON.stringify(settings));

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
  
    // Construct the settings object:
    const updatedSettings = {
      type: selectedType,
      breed: selectedBreeds,
      size: selectedSizes,
      gender: selectedGenders,
      age: selectedAges,
      color: selectedColors,
      coat: selectedCoats,
      attributes: selectedAttributes,
      location: selectedLocation,
      distance: selectedDistance
    };
  
    // Update the settings in the context:
    console.log(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <div className="p-4">
      <h2>Filter and Settings</h2>
      <Card className="mt-4">
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* dropdown for type of pet */}
            <Form.Group controlId="type">
              <Form.Label>Type of Pet</Form.Label>
              <Form.Select
                name="type"
                defaultValue={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                }}
              >
                {Object.keys(animalTypeDict).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* select for breeds */}
            <Form.Group>
              <Form.Label>Breeds</Form.Label>
              {availableBreeds.map((breed) => (
                <Form.Check
                  type="checkbox"
                  label={toTitleCase(breed.replace("_", " "))}
                  name="breed"
                  value={breed}
                  defaultChecked={selectedBreeds.includes(breed)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>

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
                onChange={e => setSelectedLocation(e.target.value)}
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
        </Card.Body>
      </Card>
    </div>
  );
}

export default SettingsPage;
